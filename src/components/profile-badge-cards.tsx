"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanyard, type DiscordStatus } from "@/components/lanyard";
import { GithubIcon, DiscordIcon } from "@/components/icons";
import type { GitHubProfile } from "@/app/api/github/commits/route";

const STATUS_DOT: Record<DiscordStatus, string> = {
  online: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  idle: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
  dnd: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
  offline: "bg-neutral-500",
};

const DEFAULT_GITHUB_PROFILE: GitHubProfile = {
  login: "thoixinh335-hash",
  name: "Fast",
  avatarUrl: "https://avatars.githubusercontent.com/u/264090890?v=4",
  bio: "Full-stack Developer & Automation Builder ⚡ | Go, TypeScript, Rust & Linux",
  followers: 0,
  following: 1,
  publicRepos: 8,
  totalRepos: 13,
  createdAt: "2026-02-26T06:30:08Z",
  htmlUrl: "https://github.com/thoixinh335-hash",
};

export function ProfileBadgeCards() {
  const lanyard = useLanyard();
  const [timeStr, setTimeStr] = useState("");
  const [github, setGithub] = useState<GitHubProfile>(DEFAULT_GITHUB_PROFILE);

  // 1. Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const day = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setTimeStr(`${formatted} • ${day}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Real-Time Live GitHub Profile Fetching & Polling
  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const res = await fetch("/api/github/commits");
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setGithub(data.profile);
          }
        }
      } catch {
        // keep fallback
      }
    };

    fetchGitHub();
    const interval = setInterval(fetchGitHub, 30000); // 30s live poll
    return () => clearInterval(interval);
  }, []);

  // 3. Discord Real-Time Lanyard Presence
  const discordUser = lanyard?.discord_user;
  const discordStatus: DiscordStatus = lanyard?.discord_status || "offline";
  const isOnline = discordStatus !== "offline";

  // Official Discord Avatar Calculation
  // 1. If Discord provides custom avatar hash, use cdn.discordapp.com
  // 2. If Discord avatar is null, compute official Discord default embed avatar (0-5)
  // 3. Fallback to /discord-avatar.png
  const getDiscordAvatarUrl = () => {
    if (discordUser?.avatar) {
      const isAnimated = discordUser.avatar.startsWith("a_");
      const ext = isAnimated ? "gif" : "png";
      return `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${ext}?size=256`;
    }
    if (discordUser?.id) {
      if (discordUser.discriminator === "0" || !discordUser.discriminator) {
        const index = Number((BigInt(discordUser.id) >> BigInt(22)) % BigInt(6));
        return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
      }
      return `https://cdn.discordapp.com/embed/avatars/${Number(discordUser.discriminator) % 5}.png`;
    }
    return "/discord-avatar.png";
  };

  const discordAvatarSrc = getDiscordAvatarUrl();

  // Discord Official Avatar Decoration Preset
  const decorationSrc = discordUser?.avatar_decoration_data?.asset
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${discordUser.avatar_decoration_data.asset}.png?size=160&passthrough=true`
    : null;

  // Real Discord Names - Real-time from Discord Lanyard
  const discordDisplayName =
    discordUser?.global_name ||
    discordUser?.display_name ||
    discordUser?.username ||
    "Zug fast";

  const discordUsername = discordUser?.username
    ? `@${discordUser.username}`
    : "@huyduc.fastvault";

  // Real-time Discord Activity / Status
  const customStatus = lanyard?.activities?.find((a) => a.type === 4)?.state;
  const gameActivity = lanyard?.activities?.find((a) => a.type !== 4);
  const discordStatusText = customStatus
    ? customStatus
    : gameActivity
    ? `Playing ${gameActivity.name}${gameActivity.state ? ` • ${gameActivity.state}` : ""}`
    : isOnline
    ? "Online on Discord"
    : "shall give a fuck..";

  // Format GitHub Join Date
  const joinedDate = new Date(github.createdAt);
  const joinedYear = joinedDate.getFullYear();
  const joinedMonth = joinedDate.toLocaleDateString("en-US", { month: "short" });

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
      {/* 1. DISCORD REAL-TIME LIVE CARD */}
      <a
        href="https://discord.com/users/819822563588964383"
        target="_blank"
        rel="noreferrer"
        className="group relative flex-1 min-w-0 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/40 p-3.5 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-black/60 hover:shadow-[0_4px_24px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Discord Real Avatar Frame with Live Decoration */}
          <div className="relative size-11 shrink-0 select-none">
            {/* Discord Avatar Decoration Preset */}
            {decorationSrc && (
              <div className="pointer-events-none absolute -inset-[18%] z-10">
                <Image
                  src={decorationSrc}
                  alt="Discord Avatar Decoration"
                  width={64}
                  height={64}
                  unoptimized
                  className="size-full object-contain"
                />
              </div>
            )}

            {/* Official Discord Avatar with Authentic Purple Ring Glow */}
            <div className="relative size-full rounded-full overflow-hidden bg-black/60 ring-2 ring-[#9333ea] shadow-[0_0_12px_rgba(147,51,234,0.35)]">
              <Image
                src={discordAvatarSrc}
                alt={`${discordDisplayName} Discord`}
                fill
                sizes="44px"
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Real-Time Live Status Dot */}
            <span
              className={`absolute bottom-0 right-0 z-20 size-3 rounded-full border-2 border-[#090a0f] ${
                STATUS_DOT[discordStatus]
              }`}
            />
          </div>

          {/* Details - min-w-0 ensures clean ellipsis (...) without overflow */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-[#EDEDEF] group-hover:text-white transition-colors truncate">
                {discordDisplayName}
              </span>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 px-2 py-0.5 text-[9px] font-medium text-emerald-400 shrink-0">
                View Profile
              </span>
            </div>
            <p
              className="text-[11px] text-[#8A8F98] truncate mt-0.5 font-sans block"
              title={discordStatusText}
            >
              {discordStatusText}
            </p>
            <p className="text-[10px] text-white/40 font-mono mt-0.5 tabular-nums truncate">
              {timeStr || "14:00 PM • Hanoi"}
            </p>
          </div>
        </div>

        {/* Discord Card Right Accent (:3) */}
        <div className="flex items-center pl-2 shrink-0">
          <span className="text-white/45 font-mono text-sm tracking-wide group-hover:text-white/90 transition-colors select-none">
            :3
          </span>
        </div>
      </a>

      {/* 2. GITHUB REAL-TIME AUTHENTIC CARD (USER'S REAL DATA) */}
      <a
        href={github.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex-1 min-w-0 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/40 p-3.5 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-black/60 hover:shadow-[0_4px_24px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Real GitHub Avatar */}
          <div className="relative size-11 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-black">
            <Image
              src={github.avatarUrl}
              alt={`${github.name} GitHub`}
              fill
              sizes="44px"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Real GitHub Profile Info - min-w-0 ensures clean ellipsis (...) */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-[#EDEDEF] group-hover:text-white transition-colors truncate">
                {github.name || github.login}
              </span>
              <span className="rounded-full bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[9px] font-medium text-white/70 shrink-0">
                View Profile
              </span>
            </div>
            {/* Bio line: cleanly truncates with ... when long, no collision */}
            <p
              className="text-[11px] text-[#8A8F98] truncate mt-0.5 font-sans block"
              title={github.bio || "Full-stack Developer & Automation Builder"}
            >
              {github.bio || "Full-stack Developer & Automation Builder"}
            </p>
            {/* Monospace stats line */}
            <p className="text-[10px] text-white/40 font-mono mt-0.5 tabular-nums truncate">
              {github.following} following • {github.followers} followers • {github.totalRepos} repos
            </p>
          </div>
        </div>

        {/* GitHub Logo */}
        <div className="flex items-center pl-2 shrink-0">
          <GithubIcon className="size-4.5 text-white/40 group-hover:text-white transition-colors" />
        </div>
      </a>
    </div>
  );
}
