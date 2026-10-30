"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter({ minimal = false }: { minimal?: boolean }) {
  const [views, setViews] = useState<number>(1138);

  useEffect(() => {
    const key = "profile-views";
    const n = parseInt(localStorage.getItem(key) ?? "0", 10) + 1;
    localStorage.setItem(key, String(n));
    setViews(1138 + n);
  }, []);

  if (minimal) {
    return (
      <span className="tabular-nums font-mono text-sm font-semibold text-[#EDEDEF]">
        {views.toLocaleString()}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-white/60 font-sans">
      <Eye className="size-3.5 text-indigo-400" />
      <span className="tabular-nums font-mono font-medium text-[#EDEDEF]">
        {views.toLocaleString()} <span className="text-white/40 text-[11px] font-sans">Pageviews</span>
      </span>
    </div>
  );
}
