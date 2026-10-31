"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { globalAudio } from "@/lib/audio-state";

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return globalAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  return (
    <button
      onClick={() => globalAudio.toggle()}
      title={isPlaying ? "Mute ambient audio (2 AM Debug Loop)" : "Play ambient audio (Lofi Chill)"}
      aria-label="Toggle ambient sound"
      className="fixed bottom-4 right-4 sm:bottom-auto sm:top-5 sm:right-6 z-50 flex items-center justify-center size-9 rounded-full bg-black/60 border border-white/[0.1] backdrop-blur-md text-white/70 hover:text-white hover:border-white/25 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
    >
      {isPlaying ? (
        <span className="relative flex items-center justify-center">
          <Volume2 className="size-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-all" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </span>
      ) : (
        <VolumeX className="size-4 text-white/50 group-hover:text-white/80 transition-colors" />
      )}
    </button>
  );
}
