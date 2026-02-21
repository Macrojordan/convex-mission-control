"use client";

import { MessageCircle, Clock3 } from "lucide-react";
import { AGENT_COLORS, PRIORITY_META } from "@/app/lib/utils";

export function TaskCard({ task, agentsById, comments, onClick }: any) {
  const priority = PRIORITY_META[task.priority] ?? PRIORITY_META.medium;

  return (
    <button
      onClick={onClick}
      className="card w-full p-3 text-left transition hover:-translate-y-0.5 hover:border-[#4a4a4a] hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
    >
      <p className="text-sm font-bold text-[#f5f5f5]">{task.title}</p>
      <p className="mt-2 line-clamp-2 min-h-10 text-xs text-[#9ca3af]">{task.description || "No description provided."}</p>

      <div className="my-3 h-px bg-[#333333]" />

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full border border-[#333333] bg-[#1f1f1f] px-2 py-1 text-[#d1d5db]">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: priority.dot }} />
          {priority.label}
        </span>
        {(task.tags?.length ? task.tags : ["frontend"]).slice(0, 2).map((tag: string) => (
          <span key={tag} className="rounded-full border border-[#333333] bg-[#1b1b1b] px-2 py-1 text-[#9ca3af]">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#9ca3af]">
        <div className="flex -space-x-2">
          {(task.assigneeIds ?? []).slice(0, 3).map((id: string) => {
            const agent = agentsById[id];
            if (!agent) return null;
            const name = (agent.name ?? "a").toLowerCase();
            return (
              <span
                key={id}
                className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#242424] text-[10px] font-semibold text-white"
                style={{ backgroundColor: AGENT_COLORS[name] ?? "#525252" }}
                title={agent.name}
              >
                {agent.name?.[0]?.toUpperCase() ?? "A"}
              </span>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" />{comments}</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />2h ago</span>
        </div>
      </div>
    </button>
  );
}
