"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanyard, type DiscordStatus } from "@/components/lanyard";

const STATUS_COLOR: Record<DiscordStatus, { dot: string; text: string; border: string }> = {
  online: { dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]", text: "Online", border: "border-emerald-500/30 text-emerald-300" },
  idle: { dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]", text: "Idle", border: "border-amber-500/30 text-amber-300" },
  dnd: { dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]", text: "Busy", border: "border-rose-500/30 text-rose-300" },
  offline: { dot: "bg-zinc-500", text: "Offline", border: "border-white/[0.08] text-white/50" },
};

const DEFAULT_DISCORD_ID = "819822563588964383";

function getDiscordDefaultAvatar(userId: string, discriminator: string = "0") {
  try {
    if (discriminator && discriminator !== "0") {
      const idx = parseInt(discriminator, 10) % 5;
      return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
    }
    const idx = Number((BigInt(userId) >> BigInt(22)) % BigInt(6));
    return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
  } catch {
    return "https://cdn.discordapp.com/embed/avatars/0.png";
  }
}

function avatarUrl(userId: string, hash: string) {
  const ext = hash.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${userId}/${hash}.${ext}?size=512`;
}

function decorationUrl(asset: string) {
  return `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=240&passthrough=true`;
}

export function DiscordAvatar({
  sizeClass = "size-20 sm:size-22",
}: {
  sizeClass?: string;
}) {
  const data = useLanyard();
  const [hasError, setHasError] = useState(false);

  const userId = data?.discord_user.id ?? DEFAULT_DISCORD_ID;
  const status: DiscordStatus = data?.discord_status ?? "offline";
  const decoration = data?.discord_user.avatar_decoration_data?.asset ?? null;
  const statusConfig = STATUS_COLOR[status];

  // Resolve avatar URL
  const resolvedSrc = (() => {
    if (hasError) return "/avatar.svg";
    if (data?.discord_user.avatar) {
      return avatarUrl(data.discord_user.id, data.discord_user.avatar);
    }
    return getDiscordDefaultAvatar(userId, data?.discord_user.discriminator);
  })();

  return (
    <div className="group relative w-fit shrink-0 select-none">
      {/* Soft Indigo Ambient Aura */}
      <div className="absolute -inset-1 rounded-2xl bg-indigo-500/15 blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Discord Avatar Decoration */}
      {decoration && (
        <div className="pointer-events-none absolute -inset-[15%] z-10">
          <Image
            src={decorationUrl(decoration)}
            alt=""
            width={240}
            height={240}
            unoptimized
            className="size-full object-contain"
          />
        </div>
      )}

      {/* Modern Squircle Avatar Frame */}
      <div className={`relative ${sizeClass} overflow-hidden rounded-2xl border border-white/[0.12] bg-[#121215] shadow-lg shadow-black/40`}>
        <Image
          src={resolvedSrc}
          alt="Avatar"
          width={192}
          height={192}
          priority
          unoptimized
          onError={() => setHasError(true)}
          className="size-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
        />
      </div>

      {/* Sleek Pill Status Badge */}
      <div className={`absolute -bottom-1.5 -right-1.5 z-20 flex items-center gap-1.5 rounded-full border bg-[#121215]/95 px-2 py-0.5 shadow-md backdrop-blur-md ${statusConfig.border}`}>
        <span className={`size-1.5 rounded-full ${statusConfig.dot}`} />
        <span className="text-[10px] font-sans font-medium tracking-tight">
          {statusConfig.text}
        </span>
      </div>
    </div>
  );
}
