"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { globalAudio } from "@/lib/audio-state";

interface EnterScreenProps {
  onEnter?: () => void;
}

export function EnterScreen({ onEnter }: EnterScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Play a soft cybernetic haptic blip sound using Web Audio API
  const playHapticBlip = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // AudioContext not supported
    }
  };

  const handleEnter = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // 1. Audio & haptics
    playHapticBlip();
    globalAudio.play();

    // 2. Trigger sleek curtain split reveal
    setIsExiting(true);
    onEnter?.();

    // 3. Complete dismiss after smooth slide finishes
    setTimeout(() => {
      setIsDismissed(true);
    }, 650);
  }, [onEnter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter]);

  if (isDismissed) return null;

  return (
    <div
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      aria-label="Click anywhere to enter profile"
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer select-none overflow-hidden"
    >
      {/* ================= UPPER CURTAIN FLAP (TRÊN) ================= */}
      <div
        className={`fixed top-0 inset-x-0 w-full h-[50.5%] bg-[#08090a] z-20 pointer-events-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* ================= LOWER CURTAIN FLAP (DƯỚI) ================= */}
      <div
        className={`fixed bottom-0 inset-x-0 w-full h-[50.5%] bg-[#08090a] z-20 pointer-events-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExiting ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* ================= CENTER IDLE HUD (FADES OUT INSTANTLY) ================= */}
      <div
        className={`relative z-30 flex flex-col items-center text-center px-4 transition-all duration-200 ease-out ${
          isExiting
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        {/* Clean Avatar without harsh colored rim */}
        <div className="relative mb-4 flex items-center justify-center">
          <div className="relative size-18 sm:size-20 rounded-full overflow-hidden border border-white/10 bg-[#121215] shadow-[0_4px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105">
            <Image
              src="https://avatars.githubusercontent.com/u/264090890?v=4"
              alt="darkwy avatar"
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Handle */}
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-3 flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          darkwy
        </span>

        {/* Minimal Iconic Prompt */}
        <div className="group flex items-center justify-center font-mono text-sm sm:text-base tracking-wide text-white/90">
          <span className="text-white/30 mr-1.5">[</span>
          <span className="animate-text-shimmer font-medium drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
            click to enter
          </span>
          <span className="text-white/30 ml-1.5">]</span>
          <span className="ml-1 inline-block w-1.5 h-4 bg-white/70 animate-pulse" />
        </div>

        {/* Subtle helper text */}
        <span className="text-[10px] font-mono text-white/25 mt-4 tracking-wider">
          press Enter or click anywhere
        </span>
      </div>
    </div>
  );
}
