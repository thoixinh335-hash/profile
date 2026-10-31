"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const BASE_VIEWS = 1248;

export function ViewCounter({ minimal = false }: { minimal?: boolean }) {
  const [views, setViews] = useState<number>(BASE_VIEWS);

  useEffect(() => {
    const key = "profile_views_v2";
    let count = 0;
    try {
      const stored = localStorage.getItem(key);
      count = stored ? parseInt(stored, 10) : 0;
      count += 1;
      localStorage.setItem(key, String(count));
      // Cleanup legacy key
      localStorage.removeItem("profile-views");
    } catch {
      count = 1;
    }
    setViews(BASE_VIEWS + count);
  }, []);

  if (minimal) {
    return (
      <span className="tabular-nums font-mono text-sm font-semibold text-[#EDEDEF]">
        {views.toLocaleString()}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/40 px-3.5 py-1.5 text-xs text-white/70 shadow-sm backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.04] select-none">
      <div className="relative flex items-center justify-center">
        <Eye className="size-3.5 text-indigo-400" />
        <span className="absolute -top-0.5 -right-0.5 size-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
      </div>
      <span className="tabular-nums font-mono font-medium text-[#EDEDEF]">
        {views.toLocaleString()}
      </span>
      <span className="text-white/40 text-[11px] font-sans">views</span>
    </div>
  );
}
