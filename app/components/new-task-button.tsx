"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function NewTaskButton({ creatorId }: { creatorId?: string }) {
  const createTask = useMutation(api.tasks.createTask);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  if (!creatorId) return null;

  const submit = async () => {
    if (!title.trim()) return;
    await createTask({ title: title.trim(), description: "", status: "inbox", priority: "medium", assigneeIds: [], createdBy: creatorId as any });
    setTitle("");
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="rounded-md border border-[#333333] bg-[#242424] px-3 py-2 text-sm text-[#f5f5f5]">+ New Task</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#333333] bg-[#1a1a1a] p-4 shadow-xl">
            <h3 className="mb-3 font-semibold text-[#f5f5f5]">Create task</h3>
            <input className="w-full rounded-md border border-[#333333] bg-[#242424] p-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-md border border-[#333333] px-3 py-2 text-sm" onClick={() => setOpen(false)}>Cancel</button>
              <button className="rounded-md bg-[#242424] px-3 py-2 text-sm text-[#f5f5f5]" onClick={submit}>Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
