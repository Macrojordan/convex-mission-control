import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedAgents = mutation({
  args: {},
  handler: async (ctx) => {
    const seed = [
      { name: "randy", role: "Coordinator", sessionKey: "agent:main:main" },
      { name: "opus", role: "Architect", sessionKey: "agent:opus:main" },
      { name: "codex", role: "Builder", sessionKey: "agent:codex:main" },
      { name: "tegridy", role: "Brand", sessionKey: "agent:tegridy:main" },
    ] as const;

    let created = 0;
    for (const a of seed) {
      const existing = await ctx.db
        .query("agents")
        .filter((q) => q.eq(q.field("name"), a.name))
        .first();
      if (!existing) {
        await ctx.db.insert("agents", {
          name: a.name,
          role: a.role,
          status: "idle",
          sessionKey: a.sessionKey,
        });
        created++;
      }
    }

    return { created, total: seed.length };
  },
});

export const updateAgentStatus = mutation({
  args: {
    agentId: v.id("agents"),
    status: v.union(v.literal("idle"), v.literal("active"), v.literal("blocked")),
    currentTaskId: v.optional(v.id("tasks")),
    lastHeartbeat: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.agentId, {
      status: args.status,
      currentTaskId: args.currentTaskId,
      lastHeartbeat: args.lastHeartbeat,
    });
    return { ok: true };
  },
});

export const listAgents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("agents").collect();
  },
});

export const getAgentsByStatus = query({
  args: {
    status: v.union(v.literal("idle"), v.literal("active"), v.literal("blocked")),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("agents")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});
