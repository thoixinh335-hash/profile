"use client";

import { useEffect, useState } from "react";
import { Sparkles, Heart } from "lucide-react";

const BASE_HEARTS = 204;

function useHeart() {
  const [count, setCount] = useState<number>(BASE_HEARTS);
  const [liked, setLiked] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    try {
      const savedCount = localStorage.getItem("hearts_count_v2");
      const isLiked = localStorage.getItem("hearts_liked_v2") === "1";

      let parsed = savedCount ? parseInt(savedCount, 10) : BASE_HEARTS;
      // If legacy high value (> 500) exists, reset to 200 base
      if (isNaN(parsed) || parsed > 500 || parsed < 100) {
        parsed = BASE_HEARTS + (isLiked ? 1 : 0);
        localStorage.setItem("hearts_count_v2", String(parsed));
      }

      // Cleanup legacy storage keys
      localStorage.removeItem("hearts");
      localStorage.removeItem("heart-liked");

      setCount(parsed);
      setLiked(isLiked);
    } catch {
      // localStorage disabled or SSR
    }
  }, []);

  const toggle = () => {
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 350);

    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : Math.max(BASE_HEARTS, count - 1);

    setLiked(nextLiked);
    setCount(nextCount);

    try {
      localStorage.setItem("hearts_count_v2", String(nextCount));
      localStorage.setItem("hearts_liked_v2", nextLiked ? "1" : "0");
      window.dispatchEvent(new Event("storage"));
    } catch {
      // fallback
    }
  };

  return { count, liked, isPopping, toggle };
}

export function HeartCounter({ large = false }: { large?: boolean }) {
  const { count, liked, isPopping, toggle } = useHeart();

  return (
    <button
      type="button"
      onClick={toggle}
      title={liked ? "Unlike profile" : "Like / Endorse profile"}
      aria-label="Endorse developer"
      className={`group relative inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-sans font-medium transition-all duration-150 cursor-pointer select-none active:scale-[0.96] backdrop-blur-md ${
        liked
          ? "border-rose-500/40 bg-rose-500/15 text-rose-200 shadow-[0_0_16px_rgba(244,63,94,0.25)]"
          : "border-white/[0.08] bg-black/40 text-white/70 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-white hover:shadow-[0_0_12px_rgba(244,63,94,0.15)]"
      }`}
    >
      <Heart
        className={`size-3.5 transition-all duration-200 ${
          isPopping ? "animate-heart-pop" : ""
        } ${
          liked
            ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] scale-105"
            : "text-white/60 group-hover:text-rose-400 group-hover:scale-110"
        }`}
      />
      <span className="font-mono tabular-nums text-xs font-medium text-[#EDEDEF]">
        {count.toLocaleString()}
      </span>
      <span
        className={`text-[11px] font-sans transition-colors ${
          liked ? "text-rose-300 font-medium" : "text-white/40 group-hover:text-rose-200"
        }`}
      >
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
      <span className="tabular-nums font-mono font-medium text-[#EDEDEF]">
        {count.toLocaleString()}
      </span>
      <span className="text-white/40 text-[11px]">Endorsements</span>
    </div>
  );
}
