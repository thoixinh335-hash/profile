"use client";

import { useEffect, useState, useId } from "react";
import { createPortal } from "react-dom";
import {
  ExternalLink,
  Star,
  RefreshCw,
  FolderGit2,
  GitCommit,
  GitFork,
  Radio,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  Cpu,
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import {
  TypeScriptIcon,
  PythonIcon,
  GolangIcon,
  ReactIcon,
  RustIcon,
  LinuxIcon,
} from "@/components/tech-icons";
import type { RepoItem, CommitItem } from "@/app/api/github/commits/route";
import { getRepoSpecification } from "@/data/repo-specifications";

const LANGUAGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  TypeScript: TypeScriptIcon,
  JavaScript: ReactIcon,
  Python: PythonIcon,
  Go: GolangIcon,
  Golang: GolangIcon,
  Rust: RustIcon,
  Shell: LinuxIcon,
  Bash: LinuxIcon,
};

const LANGUAGE_COLORS: Record<string, { brand: string; border: string; glow: string }> = {
  TypeScript: { brand: "#3178C6", border: "rgba(49, 120, 198, 0.5)", glow: "rgba(49, 120, 198, 0.25)" },
  JavaScript: { brand: "#F7DF1E", border: "rgba(247, 223, 30, 0.5)", glow: "rgba(247, 223, 30, 0.25)" },
  Go: { brand: "#00ADD8", border: "rgba(0, 173, 216, 0.5)", glow: "rgba(0, 173, 216, 0.25)" },
  Golang: { brand: "#00ADD8", border: "rgba(0, 173, 216, 0.5)", glow: "rgba(0, 173, 216, 0.25)" },
  Python: { brand: "#3776AB", border: "rgba(55, 118, 171, 0.5)", glow: "rgba(55, 118, 171, 0.25)" },
  Rust: { brand: "#DEA584", border: "rgba(222, 165, 132, 0.5)", glow: "rgba(222, 165, 132, 0.25)" },
  Shell: { brand: "#FFA500", border: "rgba(255, 165, 0, 0.5)", glow: "rgba(255, 165, 0, 0.25)" },
};

const DEFAULT_COLOR = {
  brand: "#6366F1",
  border: "rgba(99, 102, 241, 0.5)",
  glow: "rgba(99, 102, 241, 0.25)",
};

const INITIAL_REPOS: RepoItem[] = [
  {
    id: "devstore-v3",
    name: "devstore-v3",
    fullName: "thoixinh335-hash/devstore-v3",
    description: "Developer license marketplace & digital asset engine with automated key dispatch, webhook reconciliation, and merchant management.",
    language: "TypeScript",
    stars: 12,
    forks: 2,
    updatedAt: "2026-10-29T18:00:00Z",
    url: "https://github.com/thoixinh335-hash/devstore-v3",
    status: "PRODUCTION",
  },
  {
    id: "telegram-shop-bot",
    name: "telegram-shop-bot",
    fullName: "thoixinh335-hash/telegram-shop-bot",
    description: "Automated Telegram shop bot with VietQR banking reconcile, captcha solver & digital key dispatch engine.",
    language: "Go",
    stars: 3,
    forks: 0,
    updatedAt: "2026-10-30T11:30:00Z",
    url: "https://github.com/thoixinh335-hash/telegram-shop-bot",
    status: "PRIVATE",
  },
  {
    id: "li-relay-gateway",
    name: "li-relay-gateway",
    fullName: "thoixinh335-hash/li-relay-gateway",
    description: "Distributed reverse proxy & high-throughput request router with Redis caching and real-time telemetry mesh.",
    language: "Go",
    stars: 9,
    forks: 1,
    updatedAt: "2026-10-25T14:20:00Z",
    url: "https://github.com/thoixinh335-hash/li-relay-gateway",
    status: "PRODUCTION",
  },
  {
    id: "note-discord",
    name: "note-discord",
    fullName: "thoixinh335-hash/note-discord",
    description: "Auto Discord custom status automation with synced Spotify lyrics & real-time mood emoji streaming.",
    language: "Python",
    stars: 5,
    forks: 0,
    updatedAt: "2026-07-06T18:38:38Z",
    url: "https://github.com/thoixinh335-hash/note-discord",
    status: "ONLINE",
  },
  {
    id: "rng-bot",
    name: "rng-bot",
    fullName: "thoixinh335-hash/rng-bot",
    description: "Discord RNG Bot with slash commands, SQLite persistence, and modular cog interaction system.",
    language: "Python",
    stars: 4,
    forks: 0,
    updatedAt: "2026-09-24T07:43:43Z",
    url: "https://github.com/thoixinh335-hash/rng-bot",
    status: "ONLINE",
  },
  {
    id: "thoixinh335-hash",
    name: "thoixinh335-hash",
    fullName: "thoixinh335-hash/thoixinh335-hash",
    description: "Dynamic GitHub Profile README telemetry engine showcasing real-time developer metrics and status.",
    language: "TypeScript",
    stars: 7,
    forks: 0,
    updatedAt: "2026-10-30T02:34:06Z",
    url: "https://github.com/thoixinh335-hash/thoixinh335-hash",
    status: "PUBLIC",
  },
];

const INITIAL_COMMIT: CommitItem = {
  repo: "thoixinh335-hash/profile",
  repoShort: "profile",
  sha: "bc6baa4",
  message: "feat: add multi-track playlist with synced lyrics and clean zero-lag split curtain enter effect",
  author: "thoixinh335-hash",
  date: "2026-10-31T10:12:45Z",
  timeAgo: "just now",
  url: "https://github.com/thoixinh335-hash/profile/commit/bc6baa455efb67751c3fce395863d030e33cc154",
};

export function CyberArsenal() {
  const [repos, setRepos] = useState<RepoItem[]>(INITIAL_REPOS);
  const [timeline, setTimeline] = useState<CommitItem[]>([]);
  const [latestCommit, setLatestCommit] = useState<CommitItem | null>(INITIAL_COMMIT);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<RepoItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/github/commits");
      if (res.ok) {
        const data = await res.json();
        if (data.repos && data.repos.length > 0) setRepos(data.repos);
        if (data.timeline) setTimeline(data.timeline);
        if (data.latest) setLatestCommit(data.latest);
      }
    } catch {
      // keep previous
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => fetchData(), 45000);
    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setCopiedClone(false);
      setIsClosing(false);
    }, 180);
  };

  const handleCopyClone = (e: React.MouseEvent, repoName: string) => {
    e.stopPropagation();
    const cmd = `git clone https://github.com/thoixinh335-hash/${repoName}.git`;
    navigator.clipboard.writeText(cmd);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (selected) {
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selected]);

  const commitByRepo: Record<string, CommitItem> = {};
  for (const c of timeline) {
    if (!commitByRepo[c.repoShort]) {
      commitByRepo[c.repoShort] = c;
    }
  }

  const selectedColors = selected
    ? LANGUAGE_COLORS[selected.language] || DEFAULT_COLOR
    : DEFAULT_COLOR;

  const SelectedIcon = selected
    ? LANGUAGE_ICONS[selected.language] || FolderGit2
    : FolderGit2;

  const selectedCommit = selected
    ? commitByRepo[selected.name] || commitByRepo[selected.id] || commitByRepo[selected.fullName]
    : null;

  const spec = selected
    ? getRepoSpecification(selected.name, selected.language, selected.description)
    : null;

  return (
    <div>
      {/* Header Bar matching Core Engineering Stack */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2 font-sans text-xs sm:text-sm text-[#EDEDEF] font-semibold">
          <FolderGit2 className="size-4 text-indigo-400" />
          <span>Repositories & Open Source</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10.5px] text-white/50">
          <span className="hidden sm:inline">[Click chip for repo details]</span>
          <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>LIVE_SYNC</span>
          </span>
          <span className="text-indigo-400 font-medium tabular-nums">
            [{repos.length} Repos]
          </span>
          <button
            type="button"
            onClick={fetchData}
            title="Refresh repositories"
            aria-label="Refresh repositories"
            className="flex size-5 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-indigo-400 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`size-2.5 ${isLoading ? "animate-spin text-indigo-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Slim Live Commit Ticker */}
      {latestCommit && (
        <a
          href={latestCommit.url}
          target="_blank"
          rel="noreferrer"
          title={`View commit [${latestCommit.sha}] on GitHub (${latestCommit.repo})`}
          className="group mb-3.5 flex items-center justify-between rounded-xl border border-indigo-500/20 bg-indigo-950/20 px-3 py-2 font-mono text-[11px] transition-all duration-150 hover:border-indigo-400/50 hover:bg-indigo-950/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] cursor-pointer active:scale-[0.99]"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="size-1.5 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)] animate-pulse" />
            <span className="font-semibold text-indigo-400 text-[10px] uppercase tracking-wider shrink-0">
              LATEST COMMIT:
            </span>
            <span className="truncate text-white/90 group-hover:text-indigo-200 transition-colors">
              <span className="text-indigo-300 font-semibold">[{latestCommit.sha}]</span>{" "}
              <span className="text-white/80 font-sans font-medium">{latestCommit.message}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className="text-white/40 tabular-nums text-[10px] group-hover:text-white/60 transition-colors">
              {latestCommit.timeAgo}
            </span>
            <ExternalLink className="size-3 text-indigo-400/60 group-hover:text-indigo-300 transition-colors" />
          </div>
        </a>
      )}

      {/* Interactive Repository Badges (Scrollable with Sleek Scrollbar when many repos) */}
      <div className="relative">
        <div className="max-h-[250px] sm:max-h-[275px] overflow-y-auto custom-scrollbar pr-1 sm:pr-1.5 flex flex-wrap content-start gap-2 sm:gap-2.5 pb-1">
          {repos.map((repo) => {
            const Icon = LANGUAGE_ICONS[repo.language] || FolderGit2;

            return (
              <button
                key={repo.id}
                type="button"
                onClick={() => {
                  setIsClosing(false);
                  setSelected(repo);
                }}
                className="group/chip inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#16171b]/70 px-3 sm:px-3.5 py-2 font-sans text-xs font-medium text-[#EDEDEF] transition-all duration-150 hover:border-indigo-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_16px_rgba(99,102,241,0.2)] active:scale-[0.97] cursor-pointer select-none text-left"
                title={`View project details for ${repo.name}`}
              >
                <Icon className="size-4 shrink-0 transition-transform duration-150 group-hover/chip:scale-110" />
                <span className="tracking-tight">{repo.name}</span>
                {repo.stars > 0 && (
                  <span className="font-mono text-[10.5px] text-amber-400 font-medium flex items-center gap-0.5">
                    <Star className="size-2.5 fill-amber-400 text-amber-400" />
                    {repo.stars}
                  </span>
                )}
                <span className="rounded-[5px] border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] font-medium text-white/60">
                  {repo.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LINEAR REPOSITORY SPECIFICATION MODAL (PORTAL) */}
      {mounted && selected && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md transition-opacity duration-200 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleClose}
        >
          <div
            className={`linear-card relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar my-auto p-5 sm:p-6 border border-white/[0.12] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(99,102,241,0.18)] bg-[#121215] transition-all duration-200 ${
              isClosing
                ? "opacity-0 scale-95 translate-y-3"
                : "opacity-100 scale-100 translate-y-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Brand Color Bloom */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-96 rounded-full blur-3xl opacity-30 transition-all duration-300"
                style={{ background: selectedColors.glow }}
              />
            </div>

            {/* Top Status Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span className="size-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)] animate-pulse shrink-0" />
                <span className="font-sans font-semibold text-white text-xs shrink-0">
                  Repository Specification
                </span>
                <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono text-indigo-300 font-medium">
                  {spec?.category || "FULL-STACK ARCHITECTURE"}
                </span>
                <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-white/60">
                  {selected.status}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="flex size-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Main Hero Identity Section */}
            <div className="mt-4 flex items-start gap-3.5 sm:gap-4">
              {/* Language / Folder Logo in Reticle Box */}
              <div
                className="relative flex size-13 sm:size-14 shrink-0 items-center justify-center rounded-xl border bg-[#18191f] p-3 shadow-md"
                style={{ borderColor: selectedColors.border }}
              >
                <SelectedIcon className="size-7 sm:size-8 drop-shadow-sm" />
              </div>

              {/* Title & Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 id={titleId} className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                    {selected.name}
                  </h3>
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] font-medium text-white/70">
                    {selected.language}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs text-white/40 truncate">
                  {selected.fullName}
                </p>
                {spec?.architecture && (
                  <p className="mt-1 text-xs text-indigo-300 font-sans font-medium flex items-center gap-1.5">
                    <Layers className="size-3 text-indigo-400 shrink-0" />
                    <span className="truncate">{spec.architecture}</span>
                  </p>
                )}
              </div>
            </div>

            {/* 4-Column Telemetry Bento Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div className="rounded-xl border border-white/[0.06] bg-[#16171b] p-2.5 text-center">
                <div className="text-[10px] text-white/40 font-semibold uppercase">STARS</div>
                <div className="mt-0.5 text-base font-bold text-amber-400 tabular-nums flex items-center justify-center gap-1">
                  <Star className="size-3 fill-amber-400" />
                  <span>{selected.stars}</span>
                </div>
                <div className="mt-0.5 text-[9px] text-white/40">GITHUB RATING</div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-[#16171b] p-2.5 text-center">
                <div className="text-[10px] text-white/40 font-semibold uppercase">FORKS</div>
                <div className="mt-0.5 text-base font-bold text-indigo-300 tabular-nums flex items-center justify-center gap-1">
                  <GitFork className="size-3" />
                  <span>{selected.forks}</span>
                </div>
                <div className="mt-0.5 text-[9px] text-white/40">COMMUNITY</div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-[#16171b] p-2.5 text-center">
                <div className="text-[10px] text-white/40 font-semibold uppercase">ENGINE</div>
                <div className="mt-0.5 text-xs font-bold text-cyan-400 truncate" title={spec?.engine || selected.language}>
                  {selected.language}
                </div>
                <div className="mt-0.5 text-[9px] text-white/40 truncate">RUNTIME</div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-[#16171b] p-2.5 text-center">
                <div className="text-[10px] text-white/40 font-semibold uppercase">STATUS</div>
                <div className="mt-0.5 text-xs font-bold text-emerald-400 truncate flex items-center justify-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{selected.status}</span>
                </div>
                <div className="mt-0.5 text-[9px] text-white/40">LIFECYCLE</div>
              </div>
            </div>

            {/* Tech Stack & Architecture Tags */}
            {spec && spec.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {spec.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] font-medium text-white/70 hover:border-indigo-400/30 hover:text-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Core Architectural Capabilities Bento */}
            {spec && spec.highlights.length > 0 && (
              <div className="mt-3.5 space-y-2">
                <div className="font-mono text-[10px] font-semibold uppercase text-indigo-400 flex items-center gap-1.5">
                  <Zap className="size-3 text-indigo-400" />
                  <span>// CORE CAPABILITIES & HIGHLIGHTS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {spec.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/[0.06] bg-[#16171b] p-3 text-left transition-all hover:border-white/[0.12]"
                    >
                      <div className="font-sans text-xs font-semibold text-white/90 flex items-center gap-1.5 mb-1">
                        <span className="size-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span className="truncate">{h.title}</span>
                      </div>
                      <p className="font-sans text-[11px] leading-relaxed text-white/60">
                        {h.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Specification & Workflow (Deep Dive) */}
            <div className="mt-3.5 rounded-xl border border-white/[0.06] bg-[#16171b] p-3.5 text-xs leading-relaxed text-[#EDEDEF]/85 font-sans">
              <div className="font-mono text-[10px] font-semibold uppercase text-indigo-400 mb-1.5 flex items-center gap-1.5">
                <Cpu className="size-3 text-indigo-400" />
                <span>// ARCHITECTURAL DESIGN & WORKFLOW</span>
              </div>
              <p className="text-white/80 leading-relaxed font-sans text-xs">
                {spec?.deepDive || selected.description}
              </p>
            </div>

            {/* Latest Commit Snippet (if available) */}
            {selectedCommit && (
              <a
                href={selectedCommit.url}
                target="_blank"
                rel="noreferrer"
                title={`View commit [${selectedCommit.sha}] on GitHub`}
                className="group mt-3 block rounded-xl border border-white/[0.06] bg-black/40 p-3 font-mono text-[11px] transition-all hover:border-indigo-500/40 hover:bg-white/[0.04] cursor-pointer"
              >
                <div className="flex items-center justify-between text-white/40 text-[10px] mb-1">
                  <span className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">
                    <GitCommit className="size-3" />
                    LATEST COMMIT
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="tabular-nums group-hover:text-white/60 transition-colors">{selectedCommit.timeAgo}</span>
                    <ExternalLink className="size-2.5 text-white/40 group-hover:text-indigo-300 transition-colors" />
                  </div>
                </div>
                <p className="text-white/90 truncate font-sans group-hover:text-white transition-colors">
                  <span className="text-indigo-300 font-mono font-semibold">[{selectedCommit.sha}]</span>{" "}
                  {selectedCommit.message}
                </p>
              </a>
            )}

            {/* Git Quick Clone Bar */}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/50 px-3 py-2 font-mono text-xs">
              <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                <Terminal className="size-3.5 text-indigo-400 shrink-0" />
                <span className="text-white/40 select-none text-[11px]">$</span>
                <span className="text-white/80 truncate text-[11px]">
                  git clone https://github.com/thoixinh335-hash/{selected.name}.git
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => handleCopyClone(e, selected.name)}
                className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[10.5px] font-sans font-medium text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy git clone command"
              >
                {copiedClone ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span className="text-emerald-400 text-[10px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span className="text-[10px]">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Bar */}
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3.5">
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-600 px-4 py-2 font-sans text-xs font-medium text-white shadow-lg transition-all hover:bg-indigo-500 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-[0.98]"
              >
                <span>View on GitHub</span>
                <ExternalLink className="size-3.5" />
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 font-sans text-xs font-medium text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
