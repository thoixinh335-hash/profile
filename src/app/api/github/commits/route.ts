import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WEBHOOK_COMMITS_FILE = path.join(process.cwd(), "data", "github-commits.json");

export interface RepoItem {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
  status: string;
}

export interface CommitItem {
  repo: string;
  repoShort: string;
  sha: string;
  message: string;
  author: string;
  date: string;
  timeAgo: string;
  url: string;
}

const FALLBACK_REPOS: RepoItem[] = [
  {
    id: "devstore-v3",
    name: "devstore-v3",
    fullName: "thoixinh335-hash/devstore-v3",
    description: "Developer license marketplace & digital asset engine with automated key dispatch and webhook processing.",
    language: "TypeScript",
    stars: 12,
    forks: 2,
    updatedAt: "2026-10-29T18:00:00Z",
    url: "https://github.com/thoixinh335-hash/devstore-v3",
    status: "PRODUCTION",
  },
  {
    id: "li-relay-gateway",
    name: "li-relay-gateway",
    fullName: "thoixinh335-hash/li-relay-gateway",
    description: "Distributed reverse proxy & high-throughput request router with Redis caching and real-time telemetry.",
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
    description: "Dynamic GitHub Profile README telemetry engine showcasing real-time developer metrics.",
    language: "TypeScript",
    stars: 7,
    forks: 0,
    updatedAt: "2026-10-30T02:34:06Z",
    url: "https://github.com/thoixinh335-hash/thoixinh335-hash",
    status: "PUBLIC",
  },
  {
    id: "love-wrapped-20-10",
    name: "love-wrapped-20-10",
    fullName: "thoixinh335-hash/love-wrapped-20-10",
    description: "Interactive celebratory web application built with Vite, React, and Tailwind CSS deployed on GitHub Pages.",
    language: "JavaScript",
    stars: 3,
    forks: 0,
    updatedAt: "2026-10-22T11:11:15Z",
    url: "https://github.com/thoixinh335-hash/love-wrapped-20-10",
    status: "DEPLOYED",
  },
];

const FALLBACK_TIMELINE: CommitItem[] = [
  {
    repo: "thoixinh335-hash/thoixinh335-hash",
    repoShort: "thoixinh335-hash",
    sha: "3a10eef",
    message: "feat: initial release of dynamic GitHub Profile README",
    author: "Duc Huy",
    date: "2026-10-30T02:34:01Z",
    timeAgo: "today",
    url: "https://github.com/thoixinh335-hash/thoixinh335-hash/commit/3a10eef11ef7b05900adbc5be44e6af88a7f074c",
  },
  {
    repo: "thoixinh335-hash/love-wrapped-20-10",
    repoShort: "love-wrapped-20-10",
    sha: "489f70b",
    message: "Merge remote-tracking branch 'origin/main'",
    author: "thoixinh335-hash",
    date: "2026-10-22T11:10:53Z",
    timeAgo: "8d ago",
    url: "https://github.com/thoixinh335-hash/love-wrapped-20-10/commit/489f70b04094e530893a7615bc95418a46f993ec",
  },
  {
    repo: "thoixinh335-hash/love-wrapped-20-10",
    repoShort: "love-wrapped-20-10",
    sha: "4889814",
    message: "Initial commit and Vite setup",
    author: "Duc Huy",
    date: "2026-10-22T11:09:19Z",
    timeAgo: "8d ago",
    url: "https://github.com/thoixinh335-hash/love-wrapped-20-10/commit/4889814aa861a7def32d06e9ad2e7425a38474b8",
  },
  {
    repo: "thoixinh335-hash/rng-bot",
    repoShort: "rng-bot",
    sha: "454a092",
    message: "feat: them tab Tin nhan trong admin panel",
    author: "klikl",
    date: "2026-07-18T12:26:17Z",
    timeAgo: "3mo ago",
    url: "https://github.com/thoixinh335-hash/rng-bot/commit/454a092ebdd52aca677a2359e7b2b6a4ba9f8364",
  },
  {
    repo: "thoixinh335-hash/note-discord",
    repoShort: "note-discord",
    sha: "4cbb5fd",
    message: "fix: use python3 interpreter for PM2",
    author: "Duc Huy",
    date: "2026-07-06T18:39:29Z",
    timeAgo: "3mo ago",
    url: "https://github.com/thoixinh335-hash/note-discord/commit/4cbb5fd13e08b5bcd1380d457c3f87b6c5a90fb4",
  },
  {
    repo: "thoixinh335-hash/li-relay-gateway",
    repoShort: "li-relay-gateway",
    sha: "8f31b2e",
    message: "feat: high-performance request routing with Redis pool",
    author: "Duc Huy",
    date: "2026-10-25T14:21:15Z",
    timeAgo: "5d ago",
    url: "https://github.com/thoixinh335-hash/li-relay-gateway",
  },
];

function getTimeAgo(dateString: string): string {
  try {
    const now = Date.now();
    const then = new Date(dateString).getTime();
    const diffSec = Math.floor((now - then) / 1000);

    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths}mo ago`;
  } catch {
    return "recent";
  }
}

export interface GitHubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalRepos: number;
  createdAt: string;
  htmlUrl: string;
}

export interface CachedPayload {
  profile: GitHubProfile;
  repos: RepoItem[];
  timeline: CommitItem[];
  latest: CommitItem | null;
  timestamp: number;
}

let cachedPayload: CachedPayload | null = null;
const CACHE_TTL_MS = 30 * 1000;

export async function GET() {
  const now = Date.now();
  if (cachedPayload && now - cachedPayload.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      source: "cache",
      ...cachedPayload,
    });
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    "User-Agent": "Antigravity-Profile-Telemetry",
    Accept: "application/vnd.github.v3+json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    // 1. Fetch repositories from GitHub (including PRIVATE if GITHUB_TOKEN is set)
    const reposUrl = token
      ? "https://api.github.com/user/repos?visibility=all&affiliation=owner&sort=updated&per_page=15"
      : "https://api.github.com/users/thoixinh335-hash/repos?sort=updated&per_page=8";

    const reposRes = await fetch(reposUrl, { headers, next: { revalidate: 60 } });

    let repos: RepoItem[] = [...FALLBACK_REPOS];
    if (reposRes.ok) {
      const data = await reposRes.json();
      if (Array.isArray(data) && data.length > 0) {
        // Map all repos (both private and public), filtering out legacy/irrelevant repos
        const fetchedRepos: RepoItem[] = data
          .filter((r) => r.name !== "discord-self-bot" && r.name !== "treo-voice" && r.name !== "c2-control-system")
          .map((r) => {
            let desc = r.description || "Production repository with automated pipelines.";
            if (desc.toLowerCase().includes("taao gay") || desc.trim() === "taao gay") {
              desc = "Telegram automated interaction bot & webhook architecture.";
            }
            return {
              id: r.name,
              name: r.name,
              fullName: r.full_name,
              description: desc,
              language: r.language || "TypeScript",
              stars: r.stargazers_count ?? 0,
              forks: r.forks_count ?? 0,
              updatedAt: r.updated_at,
              url: r.html_url,
              status: r.private ? "PRIVATE" : "PUBLIC",
            };
          });

        // Always keep devstore-v3 as featured first
        repos = [FALLBACK_REPOS[0], ...fetchedRepos.filter((r) => r.id !== "devstore-v3")];
      }
    }

    // 2. Fetch real commit timeline across active repos
    const timelineRepos = ["thoixinh335-hash", "note-discord", "rng-bot", "love-wrapped-20-10"];
    const fetchedCommits: CommitItem[] = [];

    const commitFetches = timelineRepos.map(async (rName) => {
      try {
        const cRes = await fetch(
          `https://api.github.com/repos/thoixinh335-hash/${rName}/commits?per_page=3`,
          { headers, next: { revalidate: 60 } }
        );
        if (cRes.ok) {
          const cData = await cRes.json();
          if (Array.isArray(cData)) {
            for (const c of cData) {
              fetchedCommits.push({
                repo: `thoixinh335-hash/${rName}`,
                repoShort: rName,
                sha: c.sha.slice(0, 7),
                message: (c.commit?.message || "").split("\n")[0].slice(0, 80),
                author: c.commit?.author?.name || "Duc Huy",
                date: c.commit?.author?.date || new Date().toISOString(),
                timeAgo: getTimeAgo(c.commit?.author?.date),
                url: c.html_url,
              });
            }
          }
        }
      } catch {
        // Continue
      }
    });

    await Promise.all(commitFetches);

    // Read any incoming webhook commits (persisted from GitHub Webhook)
    try {
      const rawWebhook = await fs.readFile(WEBHOOK_COMMITS_FILE, "utf-8");
      const webhookList: CommitItem[] = JSON.parse(rawWebhook);
      if (Array.isArray(webhookList)) {
        fetchedCommits.push(...webhookList);
      }
    } catch {
      // No webhook file yet
    }

    let timeline = fetchedCommits.length > 0 ? fetchedCommits : FALLBACK_TIMELINE;
    timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    timeline = timeline.slice(0, 8);

    const latest = timeline[0] || FALLBACK_TIMELINE[0];

    // Fetch authenticated user profile
    const userUrl = token
      ? "https://api.github.com/user"
      : "https://api.github.com/users/thoixinh335-hash";

    let profile: GitHubProfile = {
      login: "thoixinh335-hash",
      name: "Fast",
      avatarUrl: "https://avatars.githubusercontent.com/u/264090890?v=4",
      bio: "Full-stack Developer & Automation Builder ⚡ | Go, TypeScript, Rust & Linux",
      followers: 0,
      following: 1,
      publicRepos: 8,
      totalRepos: repos.length,
      createdAt: "2026-02-26T06:30:08Z",
      htmlUrl: "https://github.com/thoixinh335-hash",
    };

    try {
      const userRes = await fetch(userUrl, { headers, next: { revalidate: 30 } });
      if (userRes.ok) {
        const u = await userRes.json();
        profile = {
          login: u.login || "thoixinh335-hash",
          name: u.name?.trim() || "Fast",
          avatarUrl: u.avatar_url || "https://avatars.githubusercontent.com/u/264090890?v=4",
          bio: u.bio || "Full-stack Developer & Automation Builder ⚡ | Go, TypeScript, Rust & Linux",
          followers: u.followers ?? 0,
          following: u.following ?? 1,
          publicRepos: u.public_repos ?? 8,
          totalRepos: repos.length,
          createdAt: u.created_at || "2026-02-26T06:30:08Z",
          htmlUrl: u.html_url || "https://github.com/thoixinh335-hash",
        };
      }
    } catch {
      // Keep default
    }

    cachedPayload = {
      profile,
      repos,
      timeline,
      latest,
      timestamp: now,
    };

    return NextResponse.json({
      success: true,
      source: "live",
      profile,
      repos,
      timeline,
      latest,
    });
  } catch (err) {
    const fallbackProfile: GitHubProfile = {
      login: "thoixinh335-hash",
      name: "Fast",
      avatarUrl: "https://avatars.githubusercontent.com/u/264090890?v=4",
      bio: "Full-stack Developer & Automation Builder ⚡ | Go, TypeScript, Rust & Linux",
      followers: 0,
      following: 1,
      publicRepos: 8,
      totalRepos: FALLBACK_REPOS.length,
      createdAt: "2026-02-26T06:30:08Z",
      htmlUrl: "https://github.com/thoixinh335-hash",
    };

    return NextResponse.json({
      success: false,
      source: "fallback",
      profile: fallbackProfile,
      repos: FALLBACK_REPOS,
      timeline: FALLBACK_TIMELINE,
      latest: FALLBACK_TIMELINE[0],
      error: String(err),
    });
  }
}
