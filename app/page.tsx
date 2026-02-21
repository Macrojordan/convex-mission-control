import { KanbanBoard } from "./components/kanban-board";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] p-4 md:p-6">
      <KanbanBoard />
    </main>
  );
}
