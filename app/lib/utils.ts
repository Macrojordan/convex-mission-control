import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AGENT_COLORS: Record<string, string> = {
  randy: "#f97316",
  opus: "#a855f7",
  codex: "#22c55e",
  tegridy: "#ec4899",
};

export const STATUS_COLUMNS = [
  { key: "inbox", label: "Inbox" },
  { key: "assigned", label: "Assigned" },
  { key: "in_progress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
] as const;

export const PRIORITY_META: Record<string, { dot: string; label: string }> = {
  low: { dot: "#60a5fa", label: "Low" },
  medium: { dot: "#eab308", label: "Medium" },
  high: { dot: "#ef4444", label: "High" },
};

export function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
