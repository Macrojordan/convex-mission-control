import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocument = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    type: v.union(v.literal("deliverable"), v.literal("research"), v.literal("protocol")),
    taskId: v.optional(v.id("tasks")),
    createdBy: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("documents", {
      ...args,
      createdAt: Date.now(),
    });

    await ctx.db.insert("activities", {
      type: "document_created",
      agentId: args.createdBy,
      taskId: args.taskId,
      message: `Document created: ${args.title}`,
      createdAt: Date.now(),
    });

    return id;
  },
});

export const listDocumentsByTask = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .collect();
  },
});

export const listDocuments = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});
