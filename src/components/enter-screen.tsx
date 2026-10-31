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

    // 1. Play tactile feedback + start ambient music
    playHapticBlip();
    globalAudio.play();

    // 2. Trigger eye opening animation
    setIsExiting(true);
    onEnter?.();

    // 3. Complete dismiss after eye fully opens
    setTimeout(() => {
      setIsDismissed(true);
    }, 1250);
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
      {/* ================= UPPER EYELID FLAP (MÍ MẮT TRÊN) ================= */}
      <div
        className={`fixed top-0 inset-x-0 w-full h-[75%] pointer-events-none z-20 ${
          isExiting ? "animate-eyelid-top" : "translate-y-0"
        }`}
      >
        <svg
          viewBox="0 0 1000 750"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Solid Eyelid Fill */}
          <path
            d="M -50 -50 L 1050 -50 L 1050 750 Q 500 500 -50 750 Z"
            fill="#08090a"
          />
          {/* Glowing Upper Eyelash Rim */}
          <path
            d="M -50 750 Q 500 500 1050 750"
            fill="none"
            stroke="rgba(99,102,241,0.6)"
            strokeWidth="3.5"
            className={`transition-opacity duration-300 ${
              isExiting ? "opacity-100" : "opacity-0"
            }`}
            filter="drop-shadow(0 0 10px rgba(99,102,241,0.75))"
          />
        </svg>
      </div>

      {/* ================= LOWER EYELID FLAP (MÍ MẮT DƯỚI) ================= */}
      <div
        className={`fixed bottom-0 inset-x-0 w-full h-[75%] pointer-events-none z-20 ${
          isExiting ? "animate-eyelid-bottom" : "translate-y-0"
        }`}
      >
        <svg
          viewBox="0 0 1000 750"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Solid Eyelid Fill */}
          <path
            d="M -50 800 L 1050 800 L 1050 0 Q 500 250 -50 0 Z"
            fill="#08090a"
          />
          {/* Glowing Lower Eyelash Rim */}
          <path
            d="M -50 0 Q 500 250 1050 0"
            fill="none"
            stroke="rgba(6,182,212,0.6)"
            strokeWidth="3.5"
            className={`transition-opacity duration-300 ${
              isExiting ? "opacity-100" : "opacity-0"
            }`}
            filter="drop-shadow(0 0 10px rgba(6,182,212,0.75))"
          />
        </svg>
      </div>

      {/* ================= CENTER IDLE HUD (FADES OUT INSTANTLY ON EYE OPEN) ================= */}
      <div
        className={`relative z-30 flex flex-col items-center text-center px-4 transition-all duration-200 ease-out ${
          isExiting
            ? "opacity-0 scale-95 blur-sm pointer-events-none"
            : "opacity-100 scale-100 blur-0"
        }`}
      >
        {/* Glowing Profile Avatar */}
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500/25 to-cyan-500/25 blur-md animate-pulse" />
          <div className="relative size-18 sm:size-20 rounded-full overflow-hidden border border-white/15 bg-black shadow-[0_0_30px_rgba(94,106,210,0.35)] ring-1 ring-white/10 transition-transform duration-300 hover:scale-105">
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

      {/* Iris Pupil Light Flare as Eye Opens */}
      {isExiting && (
        <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center animate-out fade-out duration-700">
          <div className="size-64 rounded-full bg-gradient-to-r from-indigo-500/25 via-cyan-500/20 to-transparent blur-3xl scale-150 transition-transform duration-700" />
        </div>
      )}
    </div>
  );
}
