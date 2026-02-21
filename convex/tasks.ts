import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const taskStatus = v.union(
  v.literal("inbox"),
  v.literal("assigned"),
  v.literal("in_progress"),
  v.literal("review"),
  v.literal("done")
);

const taskPriority = v.union(v.literal("low"), v.literal("medium"), v.literal("high"));

export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    status: taskStatus,
    assigneeIds: v.array(v.id("agents")),
    priority: taskPriority,
    createdBy: v.id("agents"),
    legacyId: v.optional(v.number()),
    legacyProjectName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const taskId = await ctx.db.insert("tasks", {
      ...args,
      archived: false,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("activities", {
      type: "task_created",
      agentId: args.createdBy,
      taskId,
      message: `Task created: ${args.title}`,
      createdAt: now,
    });

    return taskId;
  },
});

export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(taskPriority),
    assigneeIds: v.optional(v.array(v.id("agents"))),
  },
  handler: async (ctx, args) => {
    const { taskId, ...patch } = args;
    await ctx.db.patch(taskId, {
      ...patch,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const moveTask = mutation({
  args: {
    taskId: v.id("tasks"),
    fromStatus: taskStatus,
    toStatus: taskStatus,
    movedBy: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");
    if (task.status !== args.fromStatus) {
      throw new Error(`Invalid transition: current status is ${task.status}, expected ${args.fromStatus}`);
    }

    await ctx.db.patch(args.taskId, {
      status: args.toStatus,
      updatedAt: Date.now(),
    });

    await ctx.db.insert("activities", {
      type: "task_moved",
      agentId: args.movedBy,
      taskId: args.taskId,
      message: `${task.title} moved from ${args.fromStatus} to ${args.toStatus}`,
      createdAt: Date.now(),
    });

    return { ok: true };
  },
});

export const deleteTask = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      archived: true,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const listTasks = query({
  args: {
    status: v.optional(taskStatus),
    priority: v.optional(taskPriority),
    includeArchived: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const tasks = args.status
      ? await ctx.db
          .query("tasks")
          .withIndex("by_status", (q) => q.eq("status", args.status!))
          .collect()
      : await ctx.db.query("tasks").collect();

    return tasks.filter((t) => {
      if (!args.includeArchived && t.archived) return false;
      if (args.priority && t.priority !== args.priority) return false;
      return true;
    });
  },
});

export const getTasksByStatus = query({
  args: { status: taskStatus },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const getTasksByProject = query({
  args: { projectName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("legacyProjectName"), args.projectName))
      .collect();
  },
});

export const getTasksByAssignee = query({
  args: { agentId: v.id("agents") },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("tasks").collect();
    return all.filter((t) => t.assigneeIds.some((id) => id === args.agentId) && !t.archived);
  },
});
