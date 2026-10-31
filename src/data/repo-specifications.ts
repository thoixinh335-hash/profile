export interface RepoHighlight {
  icon?: string;
  title: string;
  description: string;
}

export interface DetailedRepoSpec {
  category: string;
  architecture: string;
  engine: string;
  deployment: string;
  tags: string[];
  highlights: RepoHighlight[];
  deepDive: string;
}

export const REPO_SPECIFICATIONS: Record<string, DetailedRepoSpec> = {
  "devstore-v3": {
    category: "Digital Commerce & Licensing Engine",
    architecture: "Distributed Monorepo (Next.js 15 Frontend + Go Webhook Microservice)",
    engine: "TypeScript / Go 1.22 / MySQL / Redis",
    deployment: "VPS Ubuntu 24.04 (PM2 + Nginx + Cloudflare SSL)",
    tags: ["Next.js 15", "Go (Golang)", "Redis Cache", "VietQR Auto-Pay", "Prisma ORM", "Tailwind CSS", "JWT RBAC"],
    highlights: [
      {
        title: "Instant Key Delivery",
        description: "Zero-latency automated license key dispatch via asynchronous event queues upon payment confirmation.",
      },
      {
        title: "VietQR Webhook Reconciliation",
        description: "Automated bank transfer transaction verification with checksum signature matching and idempotent processing.",
      },
      {
        title: "Merchant Analytics & Inventory",
        description: "Granular order ledger, stock reservation locking, customer telemetry, and administrative revenue charts.",
      },
    ],
    deepDive:
      "Enterprise digital asset delivery platform engineered for high-throughput software license distribution. Features an isolated Go banking reconciliation daemon listening to bank webhooks, matching unique transaction memo tokens, and unlocking cryptographic key pools with zero human intervention.",
  },

  "profile": {
    category: "Cyberpunk Interactive Portfolio & Engine",
    architecture: "Next.js 16 (Turbopack) Reactive Single-Page Architecture",
    engine: "React 19 / TypeScript / Tailwind CSS / Web Audio API",
    deployment: "Linux Production VPS (160.250.247.142) + PM2 + Nginx Reverse Proxy",
    tags: ["Next.js 16", "Turbopack", "Tailwind CSS", "Spotify Web Audio", "60fps RAF Sync", "Framer Motion", "Luminance Stacking"],
    highlights: [
      {
        title: "60fps Synced Spotify Player",
        description: "Hardware-accelerated requestAnimationFrame audio engine with sentence-level dynamic lyric tracking and seamless playlist looping.",
      },
      {
        title: "Zero-Lag Split Curtain Transition",
        description: "Hardware-accelerated entrance curtain with GPU compositor slide animation replacing heavy SVG re-renders.",
      },
      {
        title: "Live GitHub Telemetry",
        description: "Real-time commit synchronization across active repositories with instant link dispatch and status heartbeat.",
      },
    ],
    deepDive:
      "Modern technical profile and interactive engineering showcase built on Next.js 16 and Turbopack. Incorporates Linear-style dark luminance stacking, real-time GitHub telemetry, low-latency Web Audio streaming with synchronized VTT lyric cues, and zero layout shift.",
  },

  "telegram-shop-bot": {
    category: "Autonomous Telegram Commerce Gateway",
    architecture: "Event-Driven Asynchronous Bot Daemon",
    engine: "Go 1.22 / Telegram Bot API / SQLite3 / Goroutines",
    deployment: "Linux Background Service / PM2 Daemon",
    tags: ["Go (Golang)", "Telegram Bot API", "VietQR Reconcile", "Goroutines", "SQLite3 WAL", "Session State Machine"],
    highlights: [
      {
        title: "Interactive Inline Storefront",
        description: "Fast multi-level menu navigation, instant product catalog browsing, and real-time stock availability locks.",
      },
      {
        title: "Autonomous VietQR Payment Verification",
        description: "Webhook banking listeners that reconcile reference codes and deliver digital keys in <3s.",
      },
      {
        title: "High Concurrency Engine",
        description: "Goroutine-based request handling with SQLite WAL mode preventing database locking under burst loads.",
      },
    ],
    deepDive:
      "Autonomous Telegram commerce bot written in pure Go. Employs lightweight goroutines for asynchronous message handling and stateful user interaction. Integrated with VietQR payment verification to provide fully automated digital software license and gift code delivery.",
  },

  "li-relay-gateway": {
    category: "High-Throughput Reverse Proxy & Router",
    architecture: "Distributed Gateway with In-Memory Caching Mesh",
    engine: "Go / Redis Pool / WebSocket Upgrader / Linux Sockets",
    deployment: "VPS Production (:25678 / :1080) with PM2 & Systemd",
    tags: ["Go", "Reverse Proxy", "Redis Cache", "Zero-Copy I/O", "WebSocket Mesh", "Prometheus Telemetry"],
    highlights: [
      {
        title: "Sub-millisecond Request Routing",
        description: "Low-latency proxying with pooled TCP connections and buffer reuse minimizing GC pauses.",
      },
      {
        title: "Adaptive Rate Limiting",
        description: "Token-bucket IP and authorization rate limiting with distributed Redis state synchronization.",
      },
      {
        title: "Full-Duplex WS Streaming",
        description: "Real-time bi-directional telemetry broadcast and connection keepalive management.",
      },
    ],
    deepDive:
      "High-performance network routing layer and reverse proxy engineered to handle thousands of concurrent API requests. Leverages Go's net/http standard library optimized with sync.Pool buffer allocation and Redis connection caching to prevent upstream service exhaustion.",
  },

  "li-src-code-main": {
    category: "Core Microservices & Telemetry Cluster",
    architecture: "Modular Service Mesh & Distributed Persistence",
    engine: "TypeScript / Node.js / Express / Redis",
    deployment: "Linux VPS Microservices (/opt/li-src)",
    tags: ["TypeScript", "Node.js", "Redis Pool", "Microservices", "REST API", "PM2 Cluster"],
    highlights: [
      {
        title: "Modular Service Separation",
        description: "Decoupled handlers, business domain controllers, and database access abstraction layers.",
      },
      {
        title: "Low-Latency State Caching",
        description: "Redis caching with TTL invalidation pipelines for active sessions and user state.",
      },
      {
        title: "Resilient Crash Recovery",
        description: "Graceful shutdown hooks intercepting SIGTERM/SIGINT signals to cleanly flush pending writes.",
      },
    ],
    deepDive:
      "Underlying backend service cluster powering the losinginterest.life ecosystem. Implements Domain-Driven Design (DDD) principles with typed request validation, centralized error handling envelopes, and automated background jobs.",
  },

  "discord-auto-register": {
    category: "Headless Browser Automation & Anti-Detection Bot",
    architecture: "Multi-threaded Worker Pool with AI OCR / Vision Pipeline",
    engine: "Node.js / Puppeteer Chromium / Google Gemini Vision API",
    deployment: "Headless Linux VM with Rotating Residential Proxies",
    tags: ["Chromium Headless", "Puppeteer Extra", "Gemini Vision AI", "Rotating Proxies", "IMAP Email Listener"],
    highlights: [
      {
        title: "Gemini AI Captcha Solving",
        description: "High-accuracy HCaptcha and Cloudflare Turnstile visual challenge resolution via multimodal AI prompts.",
      },
      {
        title: "Stealth Fingerprinting",
        description: "Canvas, WebGL, AudioContext spoofing, and randomized user-agent/viewport evasion techniques.",
      },
      {
        title: "Automated Mailbox Handshake",
        description: "Instant OTP verification extraction via IMAP/POP3 socket listeners without manual intervention.",
      },
    ],
    deepDive:
      "Automated account provisioning pipeline built on headless Chromium. Uses Puppeteer Stealth plugin alongside rotating residential proxies. Connects with Google Gemini Vision API to parse complex visual CAPTCHA grids and automatically reads email verification tokens in real time.",
  },

  "devstore-v2": {
    category: "Digital Licensing Commerce Platform",
    architecture: "Next.js Full-Stack Application with Secure Merchant API",
    engine: "TypeScript / Next.js / Tailwind CSS / Node.js",
    deployment: "Private Production Codebase",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Digital Keys", "Merchant Dashboard"],
    highlights: [
      {
        title: "Automated License Inventory",
        description: "Secure key pool with encrypted storage and one-time reveal tokens.",
      },
      {
        title: "Order Ledger & Tracking",
        description: "Real-time billing audit logs and automated customer receipt dispatch.",
      },
      {
        title: "Modern Dark UI",
        description: "Linear-style minimalist interface with responsive desktop and mobile views.",
      },
    ],
    deepDive:
      "Second-generation digital marketplace architecture designed for speed and reliability. Features structured merchant backoffice tooling, automated key inventory tracking, and payment callback listeners.",
  },

  "src-film": {
    category: "Next-Gen Media Streaming & Cinema Platform",
    architecture: "Modern Headless Video Streaming Architecture",
    engine: "TypeScript / Next.js / Tailwind CSS / HLS Video Streamer",
    deployment: "Private Production Codebase",
    tags: ["Next.js", "HLS.js", "DASH", "Video CDN", "Tailwind CSS", "Custom Controls"],
    highlights: [
      {
        title: "Adaptive Bitrate Streaming",
        description: "HLS video playback with dynamic resolution switching based on network bandwidth.",
      },
      {
        title: "Cinema-Grade Interface",
        description: "Dark-mode responsive video player with chapter markers, speed control, and keyboard shortcuts.",
      },
      {
        title: "Edge Cached Metadata",
        description: "Fast title search and episode grouping with zero-layout-shift thumbnail previews.",
      },
    ],
    deepDive:
      "Full-stack media streaming platform tailored for high-quality video playback. Implements custom HLS player controls, episode progress persistence in local storage, and responsive theater mode.",
  },

  "rng-bot": {
    category: "Discord Entertainment & Community Automation",
    architecture: "Modular Cog Architecture with Discord.py",
    engine: "Python 3.11 / Discord.py / SQLite3",
    deployment: "Linux Background Process / PM2",
    tags: ["Python", "Discord.py", "SQLite3", "Slash Commands", "Asyncio", "Cog System"],
    highlights: [
      {
        title: "Cryptographic RNG",
        description: "Provably fair random number generator for roll games, loot boxes, and community giveaways.",
      },
      {
        title: "Modular Cog Structure",
        description: "Hot-reloadable command modules and persistent SQLite player inventory schema.",
      },
      {
        title: "Slash Command Native",
        description: "Full Discord Interactions API compliance with auto-completion and ephemeral responses.",
      },
    ],
    deepDive:
      "Feature-rich Discord community bot built with Python 3 and Discord.py. Organizes functionality into decoupled cogs for administrative moderation, RNG mini-games, and player economy persistence with SQLite3.",
  },

  "note-discord": {
    category: "Real-Time Discord Status Telemetry Daemon",
    architecture: "Persistent WebSocket Gateway Daemon",
    engine: "Python 3.11 / Discord Gateway API / Spotify Web API",
    deployment: "Linux VPS PM2 Daemon",
    tags: ["Python", "Discord Gateway", "Spotify API", "Asyncio", "Zero CLS"],
    highlights: [
      {
        title: "Dynamic Spotify Status Sync",
        description: "Real-time playback status reflection on Discord custom status with synchronized title & artist.",
      },
      {
        title: "Auto-Reconnect Loop",
        description: "Resilient heartbeat management with exponential backoff on network disconnections.",
      },
      {
        title: "Low Footprint",
        description: "Minimal resource usage consuming less than 25MB of RAM on headless Linux.",
      },
    ],
    deepDive:
      "Lightweight automation script connecting directly to Discord's WebSocket Gateway to dynamically stream current Spotify playback state, custom emojis, and mood text into Discord profile presence.",
  },

  "thoixinh335-hash": {
    category: "Dynamic GitHub Profile README Telemetry Engine",
    architecture: "GitHub Actions Workflow + Serverless API Integration",
    engine: "TypeScript / GitHub GraphQL API / SVG Generator",
    deployment: "GitHub Pages / Actions CI/CD",
    tags: ["TypeScript", "GitHub Actions", "GraphQL API", "SVG Badges", "Metric Streaming"],
    highlights: [
      {
        title: "Real-time Metric Rendering",
        description: "Automated SVG badge generation showcasing coding streak, language distribution, and commit frequency.",
      },
      {
        title: "Cron Scheduled Re-build",
        description: "Automated daily workflow runs keeping profile statistics 100% current.",
      },
      {
        title: "Zero Server Cost",
        description: "Completely serverless pipeline executing on GitHub Actions runner infrastructure.",
      },
    ],
    deepDive:
      "Automated profile telemetry engine that pulls statistics from GitHub's GraphQL API, dynamically generates personalized SVG status cards, and commits updated graphics directly to the special user profile repository.",
  },

  "love-wrapped-20-10": {
    category: "Interactive Event Celebration Web Application",
    architecture: "Client-side Vite Single-Page Application",
    engine: "React 18 / Vite / Tailwind CSS / Canvas Confetti",
    deployment: "GitHub Pages Deployed",
    tags: ["React", "Vite", "Tailwind CSS", "Canvas Confetti", "Mobile First"],
    highlights: [
      {
        title: "Story Card Progression",
        description: "Spotify Wrapped inspired multi-step storytelling with interactive touch navigation.",
      },
      {
        title: "Fluid Canvas Physics",
        description: "High-framerate petal and confetti particle physics rendered on HTML5 canvas.",
      },
      {
        title: "Zero Latency Assets",
        description: "Preloaded audio and optimized WebP images ensuring smooth instant card flips.",
      },
    ],
    deepDive:
      "Celebratory interactive web application built with React and Vite. Deployed globally via GitHub Pages with mobile-first gesture controls and canvas animation effects.",
  },

  "Bot_telegram": {
    category: "Telegram Automated Pipeline Bot",
    architecture: "Webhook & Polling Hybrid Architecture",
    engine: "TypeScript / Node.js / Telegram Bot API",
    deployment: "Private Production VPS Service",
    tags: ["TypeScript", "Telegram API", "Node.js", "Webhooks", "JSON Store"],
    highlights: [
      {
        title: "Automated Response Dispatch",
        description: "Smart command parsing and instant webhook trigger propagation.",
      },
      {
        title: "Session Persistence",
        description: "Stateful user flow tracking with lightweight JSON storage.",
      },
    ],
    deepDive:
      "Automated Telegram assistant and utility bot supporting automated notifications, command handlers, and custom webhook callbacks.",
  },

  "discord-bot-autoquest-autobadge": {
    category: "Discord Developer Automation Runner",
    architecture: "Headless Interaction Runner",
    engine: "JavaScript / Node.js / Discord API",
    deployment: "Private VPS Background Runner",
    tags: ["JavaScript", "Discord API", "OAuth2", "Automation", "PM2"],
    highlights: [
      {
        title: "Active Developer Badge Automation",
        description: "Automated interaction ping generator maintaining Discord Active Developer Badge eligibility.",
      },
      {
        title: "Scheduled Cron Execution",
        description: "Automated command trigger execution ensuring zero manual maintenance.",
      },
    ],
    deepDive:
      "Automated utility bot designed to interact periodically with Discord slash commands, fulfilling Discord API interaction requirements automatically.",
  },
};

export function getRepoSpecification(repoName: string, language: string, description: string): DetailedRepoSpec {
  const normalized = repoName.toLowerCase().trim();
  if (REPO_SPECIFICATIONS[repoName]) {
    return REPO_SPECIFICATIONS[repoName];
  }
  if (REPO_SPECIFICATIONS[normalized]) {
    return REPO_SPECIFICATIONS[normalized];
  }

  // Fallback intelligent specification for any new or unlisted repository
  return {
    category: "Full-Stack Software Architecture",
    architecture: `${language} Production Repository & Automated Pipeline`,
    engine: `${language} / Modern Runtime`,
    deployment: "Linux Production VPS / Git Automated CI/CD",
    tags: [language, "Git", "Clean Architecture", "Production Ready", "CI/CD"],
    highlights: [
      {
        title: "Modular Codebase",
        description: "Separation of concerns adhering to modern clean architectural standards and typed data safety.",
      },
      {
        title: "Automated Pipeline",
        description: "Continuous version control with granular commit tracking and remote GitHub synchronization.",
      },
      {
        title: "High Performance",
        description: "Optimized runtime execution with minimal memory overhead and fast startup cycles.",
      },
    ],
    deepDive: description || "Production-grade repository with automated build pipelines, typed data contracts, and clean domain architecture.",
  };
}
