"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { timeAgo } from "@/app/lib/utils";

export function DocumentPanel({ agentsById }: any) {
  const docs = useQuery(api.documents.listDocuments, {});
  if (!docs?.length) return null;

  return (
    <section className="panel p-4">
      <h3 className="text-sm font-semibold uppercase">Documents</h3>
      <div className="my-2 h-px bg-[#333333]" />
      <div className="space-y-3">
        {docs.slice(0, 4).map((d: any) => (
          <div key={d._id} className="rounded-md border border-[#333333] bg-[#242424] p-3">
            <p className="font-semibold text-[#f5f5f5]">📄 {d.title}</p>
            <p className="line-clamp-2 text-sm text-[#9ca3af]">{d.content}</p>
            <p className="mt-1 text-xs text-[#9ca3af]">{agentsById[d.createdBy]?.name ?? "agent"} • {timeAgo(d.createdAt)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
