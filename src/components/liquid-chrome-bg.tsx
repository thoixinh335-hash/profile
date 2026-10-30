"use client";

import { useEffect, useRef, useState } from "react";

export function LiquidChromeBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Slow-motion cinematic pace
    video.playbackRate = 0.65;

    const handlePlay = () => setIsLoaded(true);
    video.addEventListener("playing", handlePlay);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback
      });
    }

    return () => {
      video.removeEventListener("playing", handlePlay);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#08090a]">
      {/* Fallback Static High-Res Silk Wallpaper */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isLoaded ? "opacity-0" : "opacity-80"
        } scale-105`}
        style={{ backgroundImage: `url('/backgrounds/silk-poster.webp')` }}
      />

      {/* High-Definition Luxury Silk Wave Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/backgrounds/silk-poster.webp"
        src="/backgrounds/silk-luxury-hd.mp4"
        onLoadedData={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 opacity-95 sm:opacity-100 brightness-[1.12] contrast-[1.18]"
      />

      {/* Top subtle ambient highlight */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle edge shading for text readability without washing out details */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090a]/20 via-transparent to-[#08090a]/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090a]/25 via-transparent to-[#08090a]/15 pointer-events-none" />
    </div>
  );
}
