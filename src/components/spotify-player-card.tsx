"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";
import { useLanyard } from "@/components/lanyard";

const DEMO_LYRICS = [
  { time: 0, text: "Give us love another day" },
  { time: 4, text: "And hear our prayers" },
  { time: 8, text: "Coding through the midnight silence" },
  { time: 14, text: "Chasing dreams across the wire" },
  { time: 20, text: "Pain is inevitable, suffering is optional" },
  { time: 28, text: "Stay hungry, stay foolish" },
];

export function SpotifyPlayerCard() {
  const lanyard = useLanyard();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(6);
  const duration = 169; // 2:49 in seconds

  // Live Spotify data if user is actively playing on Discord
  const liveSpotify = lanyard?.spotify;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  // Compute active lyrics line
  const activeLyricIndex = DEMO_LYRICS.reduce(
    (acc, item, index) => (currentTime >= item.time ? index : acc),
    0
  );

  const activeLyric = DEMO_LYRICS[activeLyricIndex]?.text || "Give us love another day";
  const nextLyric = DEMO_LYRICS[activeLyricIndex + 1]?.text || "And hear our prayers";

  const songTitle = liveSpotify ? liveSpotify.song : "FATHER (feat. Travis Scott)";
  const artistName = liveSpotify ? liveSpotify.artist : "Kanye West, Ye & Travis Scott";
  const albumCover = liveSpotify?.album_art_url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-4 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all hover:border-white/15">
      {/* Background Ambient Glow */}
      <div className="absolute -top-12 -right-12 size-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Top Track & Controls Bar */}
      <div className="flex items-center justify-between gap-4">
        {/* Album Cover & Details */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
            <Image
              src={albumCover}
              alt={songTitle}
              fill
              sizes="48px"
              className="object-cover"
            />
            {isPlaying && (
              <span className="absolute bottom-1 right-1 flex items-end gap-0.5 h-3 w-3.5 bg-black/75 rounded px-0.5 py-0.5 backdrop-blur-sm">
                <span className="w-0.5 bg-emerald-400 rounded-full animate-eq-1" />
                <span className="w-0.5 bg-emerald-400 rounded-full animate-eq-2" />
                <span className="w-0.5 bg-emerald-400 rounded-full animate-eq-3" />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-xs sm:text-sm text-[#EDEDEF] truncate">
                {songTitle}
              </h4>
            </div>
            <p className="text-[11px] text-[#8A8F98] truncate mt-0.5">
              {artistName}
            </p>

            {/* Micro Seekbar */}
            <div className="mt-1.5 flex items-center gap-2 font-mono text-[9.5px] text-white/40">
              <span className="tabular-nums">{formatTime(currentTime)}</span>
              <div className="relative h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="tabular-nums">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
            className="text-white/40 hover:text-white transition-colors p-1"
            title="Rewind 10s"
          >
            <SkipBack className="size-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex size-8 items-center justify-center rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="size-3.5 fill-black" />
            ) : (
              <Play className="size-3.5 fill-black ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setCurrentTime((t) => Math.min(duration, t + 10))}
            className="text-white/40 hover:text-white transition-colors p-1"
            title="Tua 10s"
          >
            <SkipForward className="size-4" />
          </button>
        </div>
      </div>

      {/* Bottom Synced Lyrics Preview Box */}
      <div className="mt-3.5 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 text-center transition-all">
        <p className="font-sans text-xs sm:text-sm font-medium text-[#EDEDEF] transition-all duration-300">
          {activeLyric}
        </p>
        <p className="font-sans text-[11px] text-[#8A8F98]/50 mt-1 transition-all duration-300">
          {nextLyric}
        </p>
      </div>
    </div>
  );
}

