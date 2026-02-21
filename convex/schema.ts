import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Table 1: Agents
  agents: defineTable({
    name: v.string(), // "opus", "codex", "tegridy", "randy"
    role: v.string(), // "Architect", "Builder", "Brand", "Coordinator"
    status: v.union(v.literal("idle"), v.literal("active"), v.literal("blocked")),
    currentTaskId: v.optional(v.id("tasks")),
    sessionKey: v.string(), // "agent:main:main"
    lastHeartbeat: v.optional(v.number()),
  }).index("by_status", ["status"]),

  // Table 2: Tasks
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("inbox"),
      v.literal("assigned"),
      v.literal("in_progress"),
      v.literal("review"),
      v.literal("done")
    ),
    assigneeIds: v.array(v.id("agents")), // Can assign multiple agents
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    createdBy: v.id("agents"),
    archived: v.optional(v.boolean()),
    legacyId: v.optional(v.number()),
    legacyProjectName: v.optional(v.string()),
    updatedAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_assignee", ["assigneeIds"]),

  // Table 3: Messages (comments on tasks)
  messages: defineTable({
    taskId: v.id("tasks"),
    fromAgentId: v.id("agents"),
    content: v.string(),
    attachments: v.optional(v.array(v.id("documents"))),
    createdAt: v.number(),
  }).index("by_task", ["taskId"]),

  // Table 4: Activities (activity feed)
  activities: defineTable({
    type: v.union(
      v.literal("task_created"),
      v.literal("task_moved"),
      v.literal("message_sent"),
      v.literal("document_created"),
      v.literal("agent_assigned")
    ),
    agentId: v.id("agents"),
    taskId: v.optional(v.id("tasks")),
    message: v.string(), // "Opus moved X to review"
    createdAt: v.number(),
  })
    .index("by_agent", ["agentId"])
    .index("by_task", ["taskId"]),

  // Table 5: Documents (deliverables)
  documents: defineTable({
    title: v.string(),
    content: v.string(), // Markdown
    type: v.union(v.literal("deliverable"), v.literal("research"), v.literal("protocol")),
    taskId: v.optional(v.id("tasks")),
    createdBy: v.id("agents"),
    createdAt: v.number(),
  }).index("by_task", ["taskId"]),

  // Table 6: Notifications (@mentions)
  notifications: defineTable({
    mentionedAgentId: v.id("agents"),
    content: v.string(),
    taskId: v.optional(v.id("tasks")),
    delivered: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_agent", ["mentionedAgentId"])
    .index("by_delivered", ["delivered"]),
});
