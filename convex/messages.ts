import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const liveFeedFilter = v.union(v.literal("all"), v.literal("comments"), v.literal("decisions"));

function extractMentions(content: string) {
  const matches = content.match(/@([a-zA-Z0-9_-]+)/g) ?? [];
  return [...new Set(matches.map((m) => m.slice(1).toLowerCase()))];
}

export const createMessage = mutation({
  args: {
    taskId: v.id("tasks"),
    fromAgentId: v.id("agents"),
    content: v.string(),
    attachments: v.optional(v.array(v.id("documents"))),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("messages", {
      ...args,
      createdAt: now,
    });

    const fromAgent = await ctx.db.get(args.fromAgentId);
    const task = await ctx.db.get(args.taskId);

    await ctx.db.insert("activities", {
      type: "message_sent",
      agentId: args.fromAgentId,
      taskId: args.taskId,
      message: `${fromAgent?.name ?? "agent"} commented on ${task?.title ?? "task"}`,
      createdAt: now,
    });

    const mentionedNames = extractMentions(args.content);
    if (mentionedNames.length) {
      const allAgents = await ctx.db.query("agents").collect();
      const byName = new Map(allAgents.map((agent) => [agent.name.toLowerCase(), agent]));

      for (const mention of mentionedNames) {
        const target = byName.get(mention);
        if (!target || target._id === args.fromAgentId) continue;

        await ctx.db.insert("notifications", {
          mentionedAgentId: target._id,
          content: `${fromAgent?.name ?? "agent"} mentioned @${mention} in ${task?.title ?? "a task"}`,
          taskId: args.taskId,
          delivered: false,
          createdAt: now,
        });
      }
    }

    return id;
  },
});

export const listMessagesByTask = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .collect();
  },
});

export const getLiveFeed = query({
  args: {
    filter: v.optional(liveFeedFilter),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const feedFilter = args.filter ?? "all";
    const limit = args.limit ?? 50;

    const [messages, activities, tasks, agents] = await Promise.all([
      ctx.db.query("messages").collect(),
      ctx.db.query("activities").collect(),
      ctx.db.query("tasks").collect(),
      ctx.db.query("agents").collect(),
    ]);

    const taskById = new Map(tasks.map((task) => [task._id, task]));
    const agentById = new Map(agents.map((agent) => [agent._id, agent]));

    const messageItems = messages.map((message) => {
      const from = agentById.get(message.fromAgentId);
      const task = taskById.get(message.taskId);
      return {
        _id: `msg_${message._id}`,
        itemType: "comment" as const,
        createdAt: message.createdAt,
        taskId: message.taskId,
        taskTitle: task?.title ?? "Untitled task",
        agentId: message.fromAgentId,
        agentName: from?.name ?? "agent",
        content: message.content,
      };
    });

    const activityItems = activities.map((activity) => {
      const from = agentById.get(activity.agentId);
      const task = activity.taskId ? taskById.get(activity.taskId) : null;
      const isDecision =
        activity.type === "task_moved" && (activity.message.includes("to review") || activity.message.includes("to done"));

      return {
        _id: `act_${activity._id}`,
        itemType: (isDecision ? "decision" : "task") as "decision" | "task",
        createdAt: activity.createdAt,
        taskId: activity.taskId,
        taskTitle: task?.title ?? undefined,
        agentId: activity.agentId,
        agentName: from?.name ?? "agent",
        content: activity.message,
      };
    });

    const merged = [...messageItems, ...activityItems]
      .filter((item) => {
        if (feedFilter === "comments") return item.itemType === "comment";
        if (feedFilter === "decisions") return item.itemType === "decision";
        return true;
      })
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);

    return merged;
  },
});
