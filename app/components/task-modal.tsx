"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { STATUS_COLUMNS, timeAgo } from "@/app/lib/utils";

export function TaskModal({ task, onClose, agents }: any) {
  const updateTask = useMutation(api.tasks.updateTask);
  const moveTask = useMutation(api.tasks.moveTask);
  const createMessage = useMutation(api.messages.createMessage);
  const activity = useQuery(api.activities.getActivityByTask, task ? { taskId: task._id } : "skip");
  const messages = useQuery(api.messages.listMessagesByTask, task ? { taskId: task._id } : "skip");

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "medium");
  const [status, setStatus] = useState(task?.status ?? "inbox");
  const [comment, setComment] = useState("");

  const defaultAgent = useMemo(() => agents?.[0]?._id, [agents]);
  if (!task) return null;

  const save = async () => {
    await updateTask({ taskId: task._id, title, description, priority });
    if (status !== task.status && defaultAgent) await moveTask({ taskId: task._id, fromStatus: task.status, toStatus: status, movedBy: defaultAgent });
    onClose();
  };

  const addComment = async () => {
    if (!comment.trim() || !defaultAgent) return;
    await createMessage({ taskId: task._id, fromAgentId: defaultAgent, content: comment.trim() });
    setComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60">
      <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-[#333333] bg-[#1a1a1a] p-6">
        <button onClick={onClose} className="mb-4 text-sm text-[#9ca3af]">← Back to Board</button>
        <h2 className="text-2xl font-semibold text-[#f5f5f5]">{title}</h2>
        <div className="my-3 h-px bg-[#333333]" />

        <div className="grid grid-cols-2 gap-3">
          <select className="rounded border border-[#333333] bg-[#242424] p-2" value={status} onChange={(e) => setStatus(e.target.value)}>{STATUS_COLUMNS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}</select>
          <select className="rounded border border-[#333333] bg-[#242424] p-2" value={priority} onChange={(e) => setPriority(e.target.value)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
        </div>

        <label className="mt-4 block text-xs text-[#9ca3af]">Title</label>
        <input className="w-full rounded border border-[#333333] bg-[#242424] p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label className="mt-3 block text-xs text-[#9ca3af]">Description</label>
        <textarea className="w-full rounded border border-[#333333] bg-[#242424] p-2" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="mt-3 flex justify-end"><button onClick={save} className="rounded bg-[#242424] px-3 py-2 text-sm text-[#f5f5f5]">Save</button></div>

        <section className="mt-6">
          <h3 className="text-sm font-semibold uppercase">Comments</h3>
          <div className="my-2 h-px bg-[#333333]" />
          <div className="space-y-2">{messages?.map((m: any) => <div key={m._id} className="rounded border border-[#333333] bg-[#242424] p-2 text-sm">{m.content}</div>)}</div>
          <div className="mt-2 flex gap-2"><input className="flex-1 rounded border border-[#333333] bg-[#242424] p-2 text-sm" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." /><button onClick={addComment} className="rounded border border-[#333333] px-3 text-sm">Send</button></div>
        </section>

        <section className="mt-6">
          <h3 className="text-sm font-semibold uppercase">Activity Log</h3>
          <div className="my-2 h-px bg-[#333333]" />
          <div className="space-y-2 text-sm text-[#9ca3af]">{activity?.map((a: any) => <p key={a._id}>• {timeAgo(a.createdAt)} — {a.message}</p>)}</div>
        </section>
      </div>
    </div>
  );
}
