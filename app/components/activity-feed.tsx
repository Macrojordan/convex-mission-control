"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { timeAgo, AGENT_COLORS } from "@/app/lib/utils";

const FILTERS = [
  { key: "all", label: "All Tasks" },
  { key: "comments", label: "Comments" },
  { key: "decisions", label: "Decisions" },
] as const;

export function ActivityFeed({ agents, tasks }: any) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [fromAgentId, setFromAgentId] = useState<Id<"agents"> | "">("");
  const [taskId, setTaskId] = useState<Id<"tasks"> | "">("");
  const [content, setContent] = useState("");

  const feed = useQuery(api.messages.getLiveFeed, { filter, limit: 40 }) ?? [];
  const undeliveredNotifications = useQuery(api.notifications.getUndeliveredNotifications, {}) ?? [];
  const createMessage = useMutation(api.messages.createMessage);

  const sourceAgents = agents ?? [];
  const sourceTasks = tasks ?? [];

  const mentionsByAgent = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const n of undeliveredNotifications) {
      counts[n.mentionedAgentId] = (counts[n.mentionedAgentId] ?? 0) + 1;
    }
    return counts;
  }, [undeliveredNotifications]);

  const sendComment = async () => {
    if (!fromAgentId || !taskId || !content.trim()) return;
    await createMessage({ fromAgentId, taskId, content: content.trim() });
    setContent("");
  };

  return (
    <aside className="panel h-full p-3">
      <h3 className="editorial-headline text-base uppercase">Live Feed</h3>
      <div className="my-2 h-px bg-[#333333]" />

      <div className="mb-2 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-2.5 py-1 text-xs ${
              filter === f.key ? "border-[#4a4a4a] bg-[#242424] text-[#f5f5f5]" : "border-[#333333] text-[#9ca3af]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mb-3 rounded-lg border border-[#333333] bg-[#1f1f1f] p-2">
        <div className="mb-2 grid grid-cols-2 gap-2">
          <select
            className="rounded border border-[#333333] bg-[#242424] p-1.5 text-xs"
            value={fromAgentId}
            onChange={(e) => setFromAgentId(e.target.value as Id<"agents">)}
          >
            <option value="">Agent...</option>
            {sourceAgents.map((agent: any) => (
              <option key={agent._id} value={agent._id}>
                @{agent.name}
              </option>
            ))}
          </select>

          <select className="rounded border border-[#333333] bg-[#242424] p-1.5 text-xs" value={taskId} onChange={(e) => setTaskId(e.target.value as Id<"tasks">)}>
            <option value="">Task...</option>
            {sourceTasks.map((task: any) => (
              <option key={task._id} value={task._id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border border-[#333333] bg-[#242424] p-1.5 text-xs"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comment... use @agent for mentions"
          />
          <button onClick={sendComment} className="rounded border border-[#333333] px-2 text-xs text-[#d1d5db]">
            Send
          </button>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        {sourceAgents.slice(0, 5).map((agent: any) => {
          const name = (agent.name ?? "a").toLowerCase();
          const mentionCount = mentionsByAgent[agent._id] ?? 0;
          return (
            <span key={agent._id} className="relative grid h-7 w-7 place-items-center rounded-full text-xs font-semibold text-white" style={{ backgroundColor: AGENT_COLORS[name] ?? "#666" }} title={`@${name}`}>
              {agent.name?.[0]?.toUpperCase()}
              {mentionCount > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-[#ef4444] px-1 text-[10px] leading-4">{mentionCount}</span>}
            </span>
          );
        })}
      </div>

      <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
        {feed.map((item: any) => {
          const color = AGENT_COLORS[(item.agentName ?? "").toLowerCase()] ?? "#666";
          return (
            <div key={item._id} className="rounded-lg border border-[#333333] bg-[#242424] p-2 text-xs">
              <div className="mb-1 flex items-center justify-between gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 text-[#d1d5db]">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-semibold capitalize text-[#f5f5f5]">{item.agentName}</span>
                  <span className="text-[#9ca3af]">• {item.itemType}</span>
                </span>
                <span className="text-[#9ca3af]">{timeAgo(item.createdAt)}</span>
              </div>
              <p className="text-[#d1d5db]">{item.content}</p>
              {item.taskTitle && <p className="mt-1 text-[11px] text-[#9ca3af]">Task: {item.taskTitle}</p>}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
