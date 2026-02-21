"use client";

import { AGENT_COLORS } from "@/app/lib/utils";

export function AgentPanel({ agents, tasks, selectedAgent, setSelectedAgent }: any) {
  const countByAgent: Record<string, number> = {};
  tasks?.forEach((task: any) => task.assigneeIds.forEach((id: string) => (countByAgent[id] = (countByAgent[id] || 0) + 1)));

  return (
    <aside className="panel p-3">
      <h3 className="mb-3 text-sm font-semibold uppercase">Agents</h3>
      <div className="space-y-2">
        {agents?.map((agent: any) => {
          const active = selectedAgent === agent._id;
          return (
            <button key={agent._id} onClick={() => setSelectedAgent(active ? "all" : agent._id)} className={`flex w-full items-center justify-between rounded-md border p-2 text-sm ${active ? "border-[#555] bg-[#242424]" : "border-[#333] bg-[#1a1a1a]"}`}>
              <span className="font-medium capitalize" style={{ color: AGENT_COLORS[(agent.name ?? "").toLowerCase()] ?? "#f5f5f5" }}>{agent.name}</span>
              <span className="text-[#9ca3af]">{countByAgent[agent._id] ?? 0}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
