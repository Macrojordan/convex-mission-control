"use client";

import { useMemo, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { STATUS_COLUMNS } from "@/app/lib/utils";
import { Column } from "./column";
import { TaskModal } from "./task-modal";
import { ActivityFeed } from "./activity-feed";
import { AgentSidebar } from "./agent-sidebar";
import { Header } from "./header";

export function KanbanBoard() {
  const tasks = useQuery(api.tasks.listTasks, { includeArchived: false });
  const agents = useQuery(api.agents.listAgents);
  const activities = useQuery(api.activities.getActivityFeed, { limit: 500 });
  const moveTask = useMutation(api.tasks.moveTask);

  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const agentsById = useMemo(() => Object.fromEntries((agents ?? []).map((a: any) => [a._id, a])), [agents]);

  const messageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    (activities ?? []).forEach((a: any) => {
      if (a.type === "message_sent" && a.taskId) counts[a.taskId] = (counts[a.taskId] || 0) + 1;
    });
    return counts;
  }, [activities]);

  const filteredTasks = useMemo(() => {
    const all = tasks ?? [];
    if (selectedAgent === "all") return all;
    return all.filter((task: any) => task.assigneeIds?.includes(selectedAgent));
  }, [tasks, selectedAgent]);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const fromStatus = result.source.droppableId;
    const toStatus = result.destination.droppableId;
    if (fromStatus === toStatus) return;
    const task = (tasks ?? []).find((t: any) => t._id === result.draggableId);
    const movedBy = agents?.[0]?._id;
    if (!task || !movedBy) return;
    await moveTask({ taskId: task._id, fromStatus, toStatus, movedBy });
  };

  return (
    <div className="space-y-4">
      <Header />

      <div className="grid gap-4 xl:grid-cols-[260px_1fr_320px]">
        <AgentSidebar agents={agents} tasks={filteredTasks} selectedAgent={selectedAgent} setSelectedAgent={setSelectedAgent} />

        <section className="panel overflow-hidden p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="editorial-headline text-base uppercase">Mission Queue</h2>
            <div className="text-xs text-[#9ca3af]">Inbox • Assigned • In Progress • Review • Done</div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {STATUS_COLUMNS.map((column) => (
                <Column
                  key={column.key}
                  id={column.key}
                  title={column.label}
                  tasks={filteredTasks.filter((t: any) => t.status === column.key)}
                  agentsById={agentsById}
                  messageCounts={messageCounts}
                  onCardClick={setSelectedTask}
                />
              ))}
            </div>
          </DragDropContext>
        </section>

        <ActivityFeed activities={activities} agentsById={agentsById} />
      </div>

      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} agents={agents} />
    </div>
  );
}
