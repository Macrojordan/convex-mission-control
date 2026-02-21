"use client";

import { AGENT_COLORS } from "@/app/lib/utils";

export function AgentFilterBar({ agents, selectedAgent, setSelectedAgent, selectedPriority, setSelectedPriority, search, setSearch }: any) {
  return (
    <div className="panel flex flex-wrap items-center gap-2 p-3">
      <button onClick={() => setSelectedAgent("all")} className={`rounded-md px-2 py-1 text-sm ${selectedAgent === "all" ? "bg-[#242424] text-[#f5f5f5]" : "border border-[#333333] text-[#9ca3af]"}`}>All</button>
      {agents?.map((agent: any) => (
        <button key={agent._id} onClick={() => setSelectedAgent(agent._id)} className="rounded-md border border-[#333333] px-2 py-1 text-sm" style={{ color: AGENT_COLORS[(agent.name ?? "").toLowerCase()] ?? "#f5f5f5" }}>{agent.name}</button>
      ))}
      <select className="rounded-md border border-[#333333] bg-[#242424] px-2 py-1 text-sm" value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
        <option value="all">All Priority</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
      </select>
      <input className="min-w-56 flex-1 rounded-md border border-[#333333] bg-[#242424] px-2 py-1 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." />
    </div>
  );
}
