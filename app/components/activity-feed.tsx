"use client";

import { timeAgo, AGENT_COLORS } from "@/app/lib/utils";

const FILTERS = ["All Tasks", "Comments", "Decisions"];

export function ActivityFeed({ activities, agentsById }: any) {
  const feed = activities?.slice(0, 12) ?? [];
  const people = Object.values(agentsById ?? {}).slice(0, 4) as any[];

  return (
    <aside className="panel h-full p-4">
      <h3 className="editorial-headline text-base uppercase">Live Feed</h3>
      <div className="my-3 h-px bg-[#333333]" />

      <div className="mb-3 flex flex-wrap gap-2">
        {FILTERS.map((f, i) => (
          <button key={f} className={`rounded-full border px-3 py-1 text-xs ${i === 0 ? "border-[#4a4a4a] bg-[#242424] text-[#f5f5f5]" : "border-[#333333] text-[#9ca3af]"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-2">
        {people.map((agent: any) => {
          const name = (agent.name ?? "a").toLowerCase();
          return (
            <span key={agent._id} className="grid h-7 w-7 place-items-center rounded-full text-xs font-semibold text-white" style={{ backgroundColor: AGENT_COLORS[name] ?? "#666" }}>
              {agent.name?.[0]?.toUpperCase()}
            </span>
          );
        })}
      </div>

      <div className="space-y-3">
        {feed.map((a: any) => {
          const agent = agentsById?.[a.agentId];
          return (
            <div key={a._id} className="rounded-lg border border-[#333333] bg-[#242424] p-3 text-xs">
              <p className="text-[#d1d5db]">
                <span className="font-semibold capitalize text-[#f5f5f5]">{agent?.name ?? "agent"}</span> {a.message}
              </p>
              <p className="mt-1 text-[#9ca3af]">{timeAgo(a.createdAt)}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
