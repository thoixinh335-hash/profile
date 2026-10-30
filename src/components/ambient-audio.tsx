"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Elegant chill ambient audio
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // In case of browser autoplay policy restrictions
          setIsPlaying(false);
        });
    }
  };

  return (
    <button
      onClick={toggle}
      title={isPlaying ? "Tắt âm thanh ambient" : "Bật âm thanh ambient (Lofi Chill)"}
      aria-label="Toggle ambient sound"
      className="fixed top-5 left-5 z-50 flex items-center justify-center size-9 rounded-full bg-black/50 border border-white/[0.1] backdrop-blur-md text-white/70 hover:text-white hover:border-white/25 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
    >
      {isPlaying ? (
        <Volume2 className="size-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-all" />
      ) : (
        <VolumeX className="size-4 text-white/50 group-hover:text-white/80 transition-colors" />
      )}
    </button>
  );
}

