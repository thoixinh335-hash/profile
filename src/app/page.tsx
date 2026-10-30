"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AmbientAudio } from "@/components/ambient-audio";
import { LiquidChromeBackground } from "@/components/liquid-chrome-bg";
import { ProfileBadgeCards } from "@/components/profile-badge-cards";
import { SpotifyPlayerCard } from "@/components/spotify-player-card";
import { WorkstationCard } from "@/components/workstation-card";
import { TechStack } from "@/components/tech-stack";
import { CyberArsenal } from "@/components/cyber-arsenal";
import { DonateButton } from "@/components/donate-button";
import { HeartCounter } from "@/components/heart-counter";
import { ViewCounter } from "@/components/view-counter";
import { LanyardProvider } from "@/components/lanyard";
import { VisitorTelemetry } from "@/components/visitor-telemetry";
import {
  GithubIcon,
  DiscordIcon,
  TelegramIcon,
  MailIcon,
  GlobeIcon,
} from "@/components/icons";
import { MapPin, Sparkles, ExternalLink, Activity } from "lucide-react";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_ID ?? "819822563588964383";

const SOCIAL_PILLS = [
  { href: "https://t.me/duchuyfast", Icon: TelegramIcon, label: "@duchuyfast" },
  { href: "https://discord.com/users/819822563588964383", Icon: DiscordIcon, label: "@huyduc.fastvault" },
  { href: "https://github.com/thoixinh335-hash", Icon: GithubIcon, label: "thoixinh335-hash" },
  { href: "mailto:hello@zyo.lol", Icon: MailIcon, label: "hello@zyo.lol" },
  { href: "https://losinginterest.life/huyduc", Icon: GlobeIcon, label: "losinginterest.life" },
];

type SectionId = "about" | "setup" | "skills" | "projects";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll Spy to highlight the active section in the sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      // Don't fight programmatic smooth-scrolling while user clicked a nav tab
      if (isManualScrollRef.current) return;

      // 1. If user is scrolled near bottom of the page -> lock 'projects'
      const scrollPosition = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= totalHeight - 200) {
        setActiveSection("projects");
        return;
      }

      // 2. Viewport-relative boundary detection from bottom to top
      const threshold = window.innerWidth < 768 ? 140 : 180;
      const sections: SectionId[] = ["projects", "skills", "setup", "about"];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("about");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 850);

    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Jump to hash section if present in URL on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "") as SectionId;
      if (["about", "setup", "skills", "projects"].includes(hash)) {
        setTimeout(() => {
          scrollToSection(hash);
        }, 200);
      }
    }
  }, []);

  return (
    <LanyardProvider userId={DISCORD_ID}>
      <VisitorTelemetry />

      {/* 3D Liquid Chrome Wave Background */}
      <LiquidChromeBackground />

      {/* Floating Ambient Music Audio Player */}
      <AmbientAudio />

      {/* Top Banner (Clean Pill on Desktop) */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/60 px-4 py-1.5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <Sparkles className="size-3 text-indigo-400" />
        <span className="font-sans text-xs font-medium text-white/90">
          Available for contract & full-stack web projects
        </span>
        <span className="font-mono text-[10px] text-white/40">• Hanoi, VN</span>
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-14">
        {/* ================= MOBILE PROFILE HEADER ================= */}
        <div className="block md:hidden select-none mb-3 animate-entrance">
          <div className="flex items-center gap-3">
            <div className="relative size-11 shrink-0 rounded-full overflow-hidden border border-white/10 bg-black">
              <Image
                src="https://avatars.githubusercontent.com/u/264090890?v=4"
                alt="darkwy avatar"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h1 className="font-sans font-bold text-xl tracking-tight text-[#EDEDEF]">
                  darkwy
                </h1>
                <span className="font-sans text-xs text-[#8A8F98]">
                  Lưu Đức Huy
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/60 font-sans mt-0.5">
                <MapPin className="size-3 text-rose-400" />
                <span>Hanoi, VN</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Available for hire</span>
              </div>
            </div>
          </div>

          <p className="mt-2 font-sans italic text-xs leading-relaxed text-[#8A8F98]/80">
            cuz pain is inevitable but suffering is optional.
          </p>
        </div>

        {/* ================= FULL-PAGE STICKY MOBILE SEGMENTED TAB NAV ================= */}
        <div className="sticky top-3 z-40 block md:hidden mb-5">
          <nav className="flex items-center justify-between p-1 rounded-full bg-black/85 border border-white/[0.12] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
            {[
              { id: "about" as const, label: "About" },
              { id: "setup" as const, label: "Setup" },
              { id: "skills" as const, label: "Skills" },
              { id: "projects" as const, label: "Projects" },
            ].map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  data-active={isActive ? "true" : "false"}
                  data-section={id}
                  className={`flex-1 py-1.5 rounded-full text-xs font-mono font-medium text-center transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white/15 text-white shadow-[0_0_12px_rgba(255,255,255,0.2)] font-semibold border border-white/20"
                      : "text-white/50 hover:text-white border border-transparent"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-12">
          {/* ================= LEFT COLUMN (DESKTOP STICKY SIDEBAR) ================= */}
          <aside className="hidden md:block w-60 lg:w-68 shrink-0 md:sticky md:top-20 self-start space-y-6 select-none animate-entrance">
            {/* Name & Handle */}
            <div>
              <h1 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-[#EDEDEF]">
                darkwy
              </h1>
              <p className="mt-1 font-sans text-sm text-[#8A8F98] font-medium">
                Lưu Đức Huy
              </p>

              {/* Location */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-white/60 font-sans">
                <MapPin className="size-3.5 text-rose-400/80" />
                <span>Hanoi, Vietnam</span>
              </div>

              {/* Signature Philosophy / Italic Quote */}
              <p className="mt-3.5 font-sans italic text-xs leading-relaxed text-[#8A8F98]/80">
                cuz pain is inevitable but suffering is optional.
              </p>
            </div>

            {/* Vertical Navigation (— ABOUT, — SETUP, — SKILLS, — PROJECTS) with Silky Morph Indicator */}
            <nav className="space-y-2.5 pt-1">
              {[
                { id: "about" as const, label: "ABOUT" },
                { id: "setup" as const, label: "SETUP" },
                { id: "skills" as const, label: "SKILLS" },
                { id: "projects" as const, label: "PROJECTS" },
              ].map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    data-active={isActive ? "true" : "false"}
                    data-section={id}
                    className={`group flex items-center text-xs font-mono tracking-wider transition-all duration-300 text-left cursor-pointer ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-white/35 hover:text-white/80"
                    }`}
                  >
                    <span
                      className={`inline-block h-0.5 rounded-full transition-all duration-300 mr-2.5 ${
                        isActive
                          ? "w-5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                          : "w-2.5 bg-white/20 group-hover:w-3.5 group-hover:bg-white/40"
                      }`}
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      {label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Bottom Node & Status Hint */}
            <div className="pt-5 border-t border-white/[0.06] font-mono text-[10.5px] text-white/40 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span>Ready for hire</span>
              </div>
              <p className="text-white/30 truncate">node-01.darkwy.internal</p>
            </div>
          </aside>

          {/* ================= RIGHT COLUMN (FLOWING SECTIONS) ================= */}
          <main className="flex-1 min-w-0 space-y-8 sm:space-y-10 w-full pb-4 sm:pb-6">
            {/* SECTION 1: ABOUT */}
            <section
              id="about"
              className="scroll-mt-20 sm:scroll-mt-24 space-y-4 pt-1 reveal-section reveal-delay-1"
            >
              {/* Header */}
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/40">
                  About
                </span>
                <p className="mt-0.5 font-sans text-xs sm:text-sm text-[#8A8F98]">
                  lovely full-stack developer & web architect from Vietnam
                </p>
              </div>

              {/* Social Pill Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {SOCIAL_PILLS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/40 px-2.5 sm:px-3 py-1 font-mono text-[10.5px] sm:text-[11px] text-white/70 backdrop-blur-md transition-all duration-180 hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
                  >
                    <Icon className="size-3 text-white/50" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>

              {/* Live Discord & GitHub Presence Cards */}
              <ProfileBadgeCards />

              {/* Spotify Player Floating Widget with Synced Lyrics */}
              <SpotifyPlayerCard />
            </section>

            {/* SECTION 2: SETUP (WORKSTATION REFERENCE) */}
            <section
              id="setup"
              className="scroll-mt-20 sm:scroll-mt-24 space-y-3.5 reveal-section reveal-delay-2"
            >
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/40">
                  Setup
                </span>
              </div>
              <WorkstationCard />
            </section>

            {/* SECTION 3: SKILLS (CORE ENGINEERING STACK) */}
            <section
              id="skills"
              className="scroll-mt-20 sm:scroll-mt-24 space-y-3.5 reveal-section reveal-delay-3"
            >
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/40">
                  Skills
                </span>
                <p className="mt-0.5 font-sans text-xs sm:text-sm text-[#8A8F98]">
                  Hệ sinh thái kỹ thuật & công nghệ cốt lõi
                </p>
              </div>

              {/* Core Engineering Tech Stack Card */}
              <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-5 sm:p-6 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all hover:border-white/15">
                <TechStack />
              </div>
            </section>

            {/* SECTION 4: PROJECTS (REPOSITORIES & OPEN SOURCE BELOW SKILLS) */}
            <section
              id="projects"
              className="scroll-mt-20 sm:scroll-mt-24 space-y-3.5 reveal-section reveal-delay-4"
            >
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/40">
                  Projects
                </span>
                <p className="mt-0.5 font-sans text-xs sm:text-sm text-[#8A8F98]">
                  Các dự án open-source tiêu biểu & mã nguồn thực chiến
                </p>
              </div>

              {/* Repositories & Open Source Ecosystem Card */}
              <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-5 sm:p-6 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all hover:border-white/15">
                <CyberArsenal />
              </div>

              {/* Telemetry Endorsements & Pageviews */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-black/40 p-3.5 sm:p-4 backdrop-blur-md text-xs font-mono">
                <div className="flex items-center gap-3 sm:gap-4">
                  <ViewCounter />
                  <HeartCounter />
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] sm:text-[11px]">
                  <span>Stack: Turbopack • Tailwind v4</span>
                  <span>•</span>
                  <span className="text-emerald-400">99.99% Uptime</span>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* Global Minimalist Footer */}
        <footer className="mt-6 sm:mt-8 border-t border-white/[0.06] pt-6 text-center select-none">
          <p className="font-sans text-[11px] sm:text-xs text-[#8A8F98]">
            Designed & Developed by <span className="text-white font-medium">Lưu Đức Huy</span> (@darkwy) • Liquid Chrome Aesthetic
          </p>
        </footer>

        {/* Floating Sponsor Work Button */}
        <DonateButton />
      </div>
    </LanyardProvider>
  );
}
