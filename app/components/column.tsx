"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskCard } from "./task-card";

export function Column({ id, title, tasks, agentsById, messageCounts, onCardClick }: any) {
  return (
    <section className="w-[300px] flex-shrink-0 rounded-xl border border-[#333333] bg-[#1e1e1e] p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#f5f5f5]">{title}</h3>
        <span className="rounded-full border border-[#333333] bg-[#242424] px-2 py-0.5 text-xs text-[#9ca3af]">{tasks.length}</span>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex min-h-[320px] flex-col gap-2 rounded-lg p-1 transition ${snapshot.isDraggingOver ? "bg-[#252525]" : ""}`}
          >
            {tasks.map((task: any, index: number) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(dragProvided) => (
                  <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                    <TaskCard task={task} agentsById={agentsById} comments={messageCounts[task._id] ?? 0} onClick={() => onCardClick(task)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
