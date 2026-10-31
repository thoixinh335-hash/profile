"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Repeat } from "lucide-react";
import { useLanyard } from "@/components/lanyard";
import { globalAudio } from "@/lib/audio-state";
import { PLAYLIST, type Track } from "@/data/playlist";

export function SpotifyPlayerCard() {
  const lanyard = useLanyard();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(140.98);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Live Spotify data if user is actively playing on Discord
  const liveSpotify = lanyard?.spotify;

  // Active track from playlist
  const currentTrack: Track = PLAYLIST[trackIndex] || PLAYLIST[0];

  useEffect(() => {
    // Sync with global ambient audio state & active track index
    const unsubscribe = globalAudio.subscribe((playing, idx) => {
      setIsPlaying(playing);
      setTrackIndex(idx);
      setIsLooping(globalAudio.getIsLoopPlaylist());
    });

    const audio = globalAudio.getAudio();
    if (!audio) return unsubscribe;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (audio.duration && !isNaN(audio.duration)) {
      setDuration(audio.duration);
    } else if (currentTrack) {
      setDuration(currentTrack.duration);
    }

    setCurrentTime(audio.currentTime);

    return () => {
      unsubscribe();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [trackIndex, currentTrack]);

  // High-precision RAF loop for zero-latency per-sentence lyric synchronization
  useEffect(() => {
    const audio = globalAudio.getAudio();
    if (!audio || !isPlaying) return;

    let animId: number;
    const tick = () => {
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime);
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Active lyrics calculation from current track's verified timestamps
  const activeLyricsList = currentTrack.lyrics;
  const activeLyricIndex = activeLyricsList.reduce(
    (acc, item, index) => (currentTime >= item.time ? index : acc),
    0
  );

  const activeLyric =
    activeLyricsList[activeLyricIndex]?.text || `${currentTrack.title} — ${currentTrack.artist}`;
  const nextLyric =
    activeLyricsList[activeLyricIndex + 1]?.text || activeLyricsList[0]?.text;

  const songTitle = liveSpotify ? liveSpotify.song : currentTrack.title;
  const artistName = liveSpotify ? liveSpotify.artist : currentTrack.artist;
  const albumCover = liveSpotify?.album_art_url || currentTrack.cover;

  const handleTogglePlay = () => {
    globalAudio.toggle();
  };

  const handleToggleLoop = () => {
    const next = !isLooping;
    setIsLooping(next);
    globalAudio.setLoopPlaylist(next);
  };

  const handlePrev = () => {
    globalAudio.prevTrack(true);
  };

  const handleNext = () => {
    globalAudio.nextTrack(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * duration;
    const audio = globalAudio.getAudio();
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

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
              className="object-cover transition-opacity duration-300"
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
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-xs sm:text-sm text-[#EDEDEF] truncate">
                {songTitle}
              </h4>
              <span className="hidden sm:inline-block text-[9px] font-mono text-white/30 border border-white/10 px-1.5 py-0.2 rounded-full tabular-nums">
                {trackIndex + 1}/{PLAYLIST.length}
              </span>
            </div>
            <p className="text-[11px] text-[#8A8F98] truncate mt-0.5">
              {artistName}
            </p>

            {/* Micro Seekbar (Interactive) */}
            <div className="mt-1.5 flex items-center gap-2 font-mono text-[9.5px] text-white/40">
              <span className="tabular-nums">{formatTime(currentTime)}</span>
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                className="relative h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden cursor-pointer group/bar"
                title="Click to seek"
              >
                <div
                  className="h-full bg-white group-hover/bar:bg-emerald-400 transition-all duration-75 rounded-full"
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
            onClick={handlePrev}
            className="text-white/40 hover:text-white transition-colors p-1"
            title="Previous track"
          >
            <SkipBack className="size-4" />
          </button>

          <button
            onClick={handleTogglePlay}
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
            onClick={handleNext}
            className="text-white/40 hover:text-white transition-colors p-1"
            title="Next track"
          >
            <SkipForward className="size-4" />
          </button>

          <button
            onClick={handleToggleLoop}
            className={`relative p-1 transition-all rounded-md ${
              isLooping
                ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                : "text-white/30 hover:text-white/70"
            }`}
            title={isLooping ? "Playlist loop enabled (Vòng lặp danh sách)" : "Loop disabled"}
          >
            <Repeat className="size-3.5" />
            {isLooping && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Synced Lyrics Preview Box */}
      <div className="mt-3.5 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 text-center transition-all min-h-[62px] flex flex-col justify-center">
        <p className="font-sans text-xs sm:text-sm font-medium text-[#EDEDEF] transition-all duration-150">
          {activeLyric}
        </p>
        {nextLyric && nextLyric !== activeLyric && (
          <p className="font-sans text-[11px] text-[#8A8F98]/50 mt-1 transition-all duration-150 truncate">
            {nextLyric}
          </p>
        )}
      </div>
    </div>
  );
}
