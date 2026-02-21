import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNotification = mutation({
  args: {
    mentionedAgentId: v.id("agents"),
    content: v.string(),
    taskId: v.optional(v.id("tasks")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      ...args,
      delivered: false,
      createdAt: Date.now(),
    });
  },
});

export const markNotificationDelivered = mutation({
  args: {
    notificationId: v.id("notifications"),
    delivered: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.notificationId, { delivered: args.delivered });
    return { ok: true };
  },
});

export const getNotificationsByAgent = query({
  args: { mentionedAgentId: v.id("agents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_agent", (q) => q.eq("mentionedAgentId", args.mentionedAgentId))
      .collect();
  },
});

export const getUndeliveredNotifications = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_delivered", (q) => q.eq("delivered", false))
      .collect();
  },
});

// For notification daemon - returns full context
export const getUndeliveredForDelivery = query({
  args: {},
  handler: async (ctx) => {
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_delivered", (q) => q.eq("delivered", false))
      .collect();

    // Enrich with agent and task info
    const enriched = await Promise.all(
      notifications.map(async (n) => {
        const fromAgent = n.fromAgentId ? await ctx.db.get(n.fromAgentId) : null;
        const task = n.taskId ? await ctx.db.get(n.taskId) : null;
        return {
          ...n,
          fromAgentName: fromAgent?.name ?? "Unknown",
          taskTitle: task?.title ?? "Unknown Task",
        };
      })
    );

    return enriched;
  },
});

// Simple mark delivered for daemon
export const markDelivered = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { delivered: true });
    return { ok: true };
  },
});
