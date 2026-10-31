"use client";

import { useEffect, useState } from "react";
import { Sparkles, Heart } from "lucide-react";

function useHeart() {
  const [count, setCount] = useState<number>(1487);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hearts");
    if (saved) setCount(parseInt(saved, 10));
    setLiked(localStorage.getItem("heart-liked") === "1");

    const onStorage = () => {
      const s = localStorage.getItem("hearts");
      if (s) setCount(parseInt(s, 10));
      setLiked(localStorage.getItem("heart-liked") === "1");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = () => {
    if (liked) return;
    const next = count + 1;
    setLiked(true);
    setCount(next);
    localStorage.setItem("hearts", String(next));
    localStorage.setItem("heart-liked", "1");
    window.dispatchEvent(new Event("storage"));
  };

  return { count, liked, toggle };
}

export function HeartCounter({ large = false }: { large?: boolean }) {
  const { count, liked, toggle } = useHeart();

  return (
    <button
      onClick={toggle}
      disabled={liked}
      aria-label="Endorse developer"
      className={`group relative flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-sans font-medium text-white transition-all duration-150 hover:border-rose-500/40 hover:bg-rose-500/10 hover:shadow-[0_0_16px_rgba(244,63,94,0.18)] active:scale-[0.98] ${
        liked ? "border-rose-500/40 bg-rose-500/10 text-rose-300" : ""
      }`}
    >
      <Heart
        className={`size-3.5 transition-all duration-150 ${
          liked
            ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
            : "text-white/60 group-hover:text-rose-400 group-hover:fill-rose-400/40"
        }`}
      />
      <span className="font-mono tabular-nums text-xs">{count.toLocaleString()}</span>
      <span className="text-[11px] font-sans text-white/40 group-hover:text-rose-200">
        {liked ? "Endorsed" : "Endorse"}
      </span>
    </button>
  );
}

export function HeartDisplay({ minimal = false }: { minimal?: boolean }) {
  const { count } = useHeart();

  if (minimal) {
    return (
      <span className="tabular-nums font-mono text-sm font-semibold text-[#EDEDEF]">
        {count.toLocaleString()}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-white/60 font-sans">
      <Sparkles className="size-3.5 text-rose-400" />
      <span className="tabular-nums font-mono font-medium text-[#EDEDEF]">{count.toLocaleString()}</span>
      <span className="text-white/40 text-[11px]">Endorsements</span>
    </div>
  );
}
