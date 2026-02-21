"use client";

import { AGENT_COLORS } from "@/app/lib/utils";

const FALLBACK_AGENTS = [
  { _id: "randy", name: "randy", role: "COORDINATOR", status: "working", task: "Build Kanban UI", assigned: 2 },
  { _id: "opus", name: "opus", role: "ARCHITECT", status: "busy", task: "Design API", assigned: 1 },
  { _id: "codex", name: "codex", role: "BUILDER", status: "working", task: "Implement UI", assigned: 1 },
  { _id: "tegridy", name: "tegridy", role: "BRAND", status: "active", task: "Write content", assigned: 1 },
];

function statusColor(status: string) {
  if (status === "working" || status === "active") return "#4ade80";
  if (status === "busy") return "#facc15";
  return "#9ca3af";
}

export function AgentSidebar({ agents, tasks, selectedAgent, setSelectedAgent }: any) {
  const source = (agents?.length ? agents : FALLBACK_AGENTS).slice(0, 4);

  return (
    <aside className="panel h-full p-3">
      <h3 className="editorial-headline text-base uppercase">Agents</h3>
      <div className="my-2 h-px bg-[#333333]" />

      <div className="space-y-2">
        {source.map((agent: any) => {
          const id = agent._id ?? agent.name;
          const assigned = tasks?.filter((t: any) => t.assigneeIds?.includes(id)).length ?? agent.assigned ?? 0;
          const activeTask = tasks?.find((t: any) => t.assigneeIds?.includes(id))?.title ?? agent.task ?? "No active task";
          const active = selectedAgent === id;
          const name = (agent.name ?? "agent").toLowerCase();

          return (
            <button
              key={id}
              onClick={() => setSelectedAgent(active ? "all" : id)}
              className={`w-full rounded-lg border px-2.5 py-2 text-left transition ${
                active ? "border-[#555555] bg-[#242424]" : "border-[#333333] bg-[#1a1a1a] hover:bg-[#202020]"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold capitalize" style={{ color: AGENT_COLORS[name] ?? "#f5f5f5" }}>
                  {name}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#d1d5db]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusColor(agent.status) }} />
                  {agent.status ?? "idle"}
                </span>
              </div>
              <p className="text-[10px] text-[#9ca3af]">{agent.role}</p>
              <p className="mt-1 line-clamp-1 text-[11px] text-[#9ca3af]">{activeTask}</p>
              <p className="text-[11px] text-[#9ca3af]">{assigned} task{assigned === 1 ? "" : "s"}</p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
