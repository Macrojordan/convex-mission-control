import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const logActivity = mutation({
  args: {
    type: v.union(
      v.literal("task_created"),
      v.literal("task_moved"),
      v.literal("message_sent"),
      v.literal("document_created"),
      v.literal("agent_assigned")
    ),
    agentId: v.id("agents"),
    taskId: v.optional(v.id("tasks")),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activities", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getActivityFeed = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("activities").collect();
    const sorted = all.sort((a, b) => b.createdAt - a.createdAt);
    return sorted.slice(0, args.limit ?? 100);
  },
});

export const getActivityByAgent = query({
  args: { agentId: v.id("agents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("activities")
      .withIndex("by_agent", (q) => q.eq("agentId", args.agentId))
      .collect();
  },
});

export const getActivityByTask = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("activities")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .collect();
  },
});
