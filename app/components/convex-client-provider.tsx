"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;

  const client = useMemo(() => {
    if (!url) return null;
    return new ConvexReactClient(url);
  }, [url]);

  if (!url || !client) {
    return <div className="p-6 text-sm text-red-600">Missing NEXT_PUBLIC_CONVEX_URL in environment.</div>;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
