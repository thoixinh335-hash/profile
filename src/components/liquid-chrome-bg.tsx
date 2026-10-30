"use client";

import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("./color-bends"), {
  ssr: false,
});

export function LiquidChromeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black select-none">
      {/* Real-time WebGL Three.js Wave Shader (React Bits ColorBends) */}
      <div className="absolute inset-0 w-full h-full brightness-[0.45]">
        <ColorBends
          colors={["#ffffff", "#a1a1aa", "#a3a3a3"]}
          speed={0.1}
          scale={1}
          intensity={1.5}
          frequency={1}
          warpStrength={1}
          rotation={90}
          transparent={false}
          noise={0.08}
        />
      </div>

      {/* Cinematic Radial Vignette from Frail / PS3 Theme */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 26%, rgba(0,0,0,0.42) 58%, #000000 100%)",
        }}
      />

      {/* Subtle edge shading for high-contrast card readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
