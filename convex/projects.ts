import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Compatibility wrapper during migration:
 * the new Mission Control schema has no standalone projects table.
 * We keep project names in tasks.legacyProjectName and derive distinct project list from tasks.
 */

export const createProject = mutation({
  args: {
    name: v.string(),
    createdBy: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("documents", {
      title: `Project: ${args.name}`,
      content: `Project placeholder for ${args.name}`,
      type: "protocol",
      createdBy: args.createdBy,
      createdAt: Date.now(),
    });
    return { ok: true, note: "Projects are derived from tasks.legacyProjectName", placeholderDocumentId: id };
  },
});

export const listProjects = query({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query("tasks").collect();
    return [...new Set(tasks.map((t) => t.legacyProjectName).filter(Boolean))].sort();
  },
});
