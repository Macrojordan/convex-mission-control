"use client";

export function Header() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="panel px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="editorial-headline text-2xl font-semibold uppercase">Mission Control</h1>
          <div className="mt-2 h-px w-44 bg-[#333333]" />
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-[#d1d5db]">
          <p className="font-medium text-[#f5f5f5]">4 AGENTS ACTIVE</p>
          <p className="font-medium text-[#f5f5f5]">42 TASKS IN QUEUE</p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="font-mono text-[#d1d5db]">{time}</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#333333] bg-[#1f1f1f] px-3 py-1 text-[#4ade80]">
            <span className="h-2 w-2 rounded-full bg-[#4ade80]" /> ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}
