"use client";

import { useEffect, useState, useId } from "react";
import { createPortal } from "react-dom";
import {
  TypeScriptIcon,
  ReactIcon,
  NextJsIcon,
  GolangIcon,
  RustIcon,
  LinuxIcon,
  DockerIcon,
  PostgresIcon,
  RedisIcon,
  NodeJsIcon,
  TailwindIcon,
  PythonIcon,
  JavaScriptIcon,
  PhpIcon,
  MySqlIcon,
  CppIcon,
  GitIcon,
  BashIcon,
  GraphqlIcon,
  PrismaIcon,
  NginxIcon,
  FastApiIcon,
  BunIcon,
  WebSocketIcon,
} from "@/components/tech-icons";
import { X, ExternalLink, Cpu } from "lucide-react";

export interface TechItem {
  id: string;
  name: string;
  version: string;
  category: string;
  brandColor: string;
  accentBorder: string;
  accentGlow: string;
  Icon: React.ComponentType<{ className?: string }>;
  role: string;
  activeProjects: string[];
  ecosystem: string[];
  description: string;
  docsUrl: string;
}

export const TECH_ITEMS: TechItem[] = [
  {
    id: "typescript",
    name: "TypeScript",
    version: "v5.8 // Strict Mode",
    category: "LANGUAGES",
    brandColor: "#3178C6",
    accentBorder: "rgba(49, 120, 198, 0.5)",
    accentGlow: "rgba(49, 120, 198, 0.25)",
    Icon: TypeScriptIcon,
    role: "Core Distributed Systems & Strict Typings",
    activeProjects: ["devstore", "discord-badge", "fast-portfolio"],
    ecosystem: ["Zod", "tRPC", "Next.js", "Bun", "Node.js", "Prisma"],
    description:
      "Ngôn ngữ xương sống cho toàn bộ dự án distributed backend & frontend. Sử dụng strict compiler flag, meta-types generic phức tạp, AST validation và zero-runtime type errors.",
    docsUrl: "https://www.typescriptlang.org",
  },
  {
    id: "react",
    name: "React 19",
    version: "v19.2 // RSC Engine",
    category: "FRONTEND",
    brandColor: "#61DAFB",
    accentBorder: "rgba(97, 218, 251, 0.5)",
    accentGlow: "rgba(97, 218, 251, 0.25)",
    Icon: ReactIcon,
    role: "High-Performance Reactive Web UI",
    activeProjects: ["fast-portfolio", "devstore-frontend"],
    ecosystem: ["Server Components", "Suspense", "Zustand", "TanStack Query", "Actions"],
    description:
      "Thiết kế giao diện siêu tốc với React Server Components (RSC), cơ chế Optimistic UI cập nhật giao diện trước phản hồi server, xử lý streaming render triệt tiêu độ trễ.",
    docsUrl: "https://react.dev",
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    version: "v16.3.2 // Turbopack",
    category: "FRAMEWORK",
    brandColor: "#FFFFFF",
    accentBorder: "rgba(255, 255, 255, 0.4)",
    accentGlow: "rgba(255, 255, 255, 0.2)",
    Icon: NextJsIcon,
    role: "Hybrid SSR / Edge API Architecture",
    activeProjects: ["devstore-frontend", "fast-portfolio"],
    ecosystem: ["App Router", "Turbopack", "Edge Middleware", "Route Handlers", "Server Actions"],
    description:
      "Nền tảng full-stack hiện đại với trình biên dịch Turbopack tốc độ tính bằng mili-giây, hybrid edge caching, streaming HTML và API gateway bảo mật đa lớp.",
    docsUrl: "https://nextjs.org",
  },
  {
    id: "golang",
    name: "Golang",
    version: "v1.24 // Concurrency",
    category: "BACKEND",
    brandColor: "#00ADD8",
    accentBorder: "rgba(0, 173, 216, 0.5)",
    accentGlow: "rgba(0, 173, 216, 0.25)",
    Icon: GolangIcon,
    role: "High-Concurrency Network Relays & Proxies",
    activeProjects: ["li-backend", "li-proxy", "li-relay"],
    ecosystem: ["Goroutines", "Channels", "Chi / Fiber", "gRPC", "Protobuf", "net/http"],
    description:
      "Vận hành cụm li-* proxy và relay network. Điều hướng gói tin TCP/UDP sub-millisecond, quản lý hàng triệu goroutines đồng thời với memory footprint cực thấp.",
    docsUrl: "https://go.dev",
  },
  {
    id: "rust",
    name: "Rust / C",
    version: "Edition 2024 // Systems",
    category: "SYSTEMS",
    brandColor: "#DEA584",
    accentBorder: "rgba(222, 165, 132, 0.5)",
    accentGlow: "rgba(222, 165, 132, 0.25)",
    Icon: RustIcon,
    role: "High-Performance Systems & Native Modules",
    activeProjects: ["native-modules", "network-tuning"],
    ecosystem: ["Tokio", "Cargo", "Actix", "Rayon", "FFI", "Socket Raw"],
    description:
      "Xây dựng các module hiệu năng cao, tối ưu tài nguyên và xử lý tính toán chuyên sâu song song với độ an toàn bộ nhớ tuyệt đối.",
    docsUrl: "https://www.rust-lang.org",
  },
  {
    id: "nodejs",
    name: "Node.js",
    version: "v22 LTS // V8 Engine",
    category: "RUNTIME",
    brandColor: "#5FA04E",
    accentBorder: "rgba(95, 160, 78, 0.5)",
    accentGlow: "rgba(95, 160, 78, 0.25)",
    Icon: NodeJsIcon,
    role: "Autonomous Bot Gateways & High-Concurrency APIs",
    activeProjects: ["discord-badge", "devstore-backend", "li-bot-center"],
    ecosystem: ["Cluster API", "Discord.js", "BullMQ", "Fastify", "Streams", "Worker Threads"],
    description:
      "Chạy hệ thống bot sharding discord-badge và devstore microservices. Xử lý WebSocket connection mật độ lớn, non-blocking event loop và hàng đợi bất đồng bộ.",
    docsUrl: "https://nodejs.org",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    version: "v4.0 // Lightning Engine",
    category: "DESIGN",
    brandColor: "#06B6D4",
    accentBorder: "rgba(6, 182, 212, 0.5)",
    accentGlow: "rgba(6, 182, 212, 0.25)",
    Icon: TailwindIcon,
    role: "Modern Dark-First Design Tokens & Luminance Stacking",
    activeProjects: ["fast-portfolio", "devstore-ui"],
    ecosystem: ["Tailwind v4", "CSS Custom Properties", "Geist Design System", "Bento Grid"],
    description:
      "Hiện thực hóa phong cách Linear dark-first sắc sảo: hairline borders, bố cục Bento Grid, hiệu ứng viền kính, ánh sáng ambient bloom chuẩn xác và zero-CLS layout.",
    docsUrl: "https://tailwindcss.com",
  },
  {
    id: "python",
    name: "Python",
    version: "v3.13 // Scripting & Automation",
    category: "AUTOMATION",
    brandColor: "#3776AB",
    accentBorder: "rgba(55, 118, 171, 0.5)",
    accentGlow: "rgba(255, 212, 56, 0.25)",
    Icon: PythonIcon,
    role: "Data Pipelines, Automation & Web Scraping",
    activeProjects: ["automation-scripts", "web-scrapers"],
    ecosystem: ["FastAPI", "Asyncio", "Playwright", "Requests", "NumPy", "PyTorch"],
    description:
      "Tự động hóa tác vụ, crawl dữ liệu web với Playwright/Asyncio, phát triển các bot tương tác tự động và xây dựng REST API tốc độ cao với FastAPI.",
    docsUrl: "https://www.python.org",
  },
  {
    id: "docker",
    name: "Docker",
    version: "Engine v27 // Multi-Arch",
    category: "DEVOPS",
    brandColor: "#2496ED",
    accentBorder: "rgba(36, 150, 237, 0.5)",
    accentGlow: "rgba(36, 150, 237, 0.25)",
    Icon: DockerIcon,
    role: "Hardened Container Sandboxes & Zero-Downtime Deploy",
    activeProjects: ["vps-badge (production)", "multi-arch"],
    ecosystem: ["Docker Compose", "Multi-stage Builds", "Alpine Linux", "Bridge Networks"],
    description:
      "Đóng gói container tối giản trên VPS Production. Thiết lập multi-stage build giảm kích thước image, namespace isolation an toàn và tự động restart service với PM2 / Docker.",
    docsUrl: "https://www.docker.com",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    version: "v17 // Enterprise ACID",
    category: "DATABASE",
    brandColor: "#336791",
    accentBorder: "rgba(51, 103, 145, 0.5)",
    accentGlow: "rgba(51, 103, 145, 0.25)",
    Icon: PostgresIcon,
    role: "Relational Persistence & High-Volume JSONB Stores",
    activeProjects: ["devstore-db", "auth-schema"],
    ecosystem: ["PgBouncer", "Prisma", "pgvector", "Composite Indexes", "Partitioning"],
    description:
      "Cơ sở dữ liệu giao dịch cốt lõi của devstore. Tối ưu hóa chỉ mục B-Tree, quản lý transaction tài chính an toàn, JSONB indexing và connection pooling thông minh.",
    docsUrl: "https://www.postgresql.org",
  },
  {
    id: "redis",
    name: "Redis",
    version: "v7.4 // In-Memory Core",
    category: "DATABASE",
    brandColor: "#DC382D",
    accentBorder: "rgba(220, 56, 45, 0.5)",
    accentGlow: "rgba(220, 56, 45, 0.25)",
    Icon: RedisIcon,
    role: "Sub-Millisecond Cache & Pub/Sub Stream Engine",
    activeProjects: ["session-cache", "lanyard-store", "rate-limiter"],
    ecosystem: ["Pub/Sub", "Streams", "Redis Cluster", "Lua Scripts", "BullMQ"],
    description:
      "Bộ nhớ đệm siêu tốc độ với thời gian phản hồi dưới 0.5ms. Sử dụng cho session authentication (TTL 30s-300s), token bucket rate limiting và pub/sub message broker.",
    docsUrl: "https://redis.io",
  },
  {
    id: "linux",
    name: "Kali / Linux Kernel",
    version: "Linux 6.x // Debian Hardened",
    category: "INFRASTRUCTURE",
    brandColor: "#FFA500",
    accentBorder: "rgba(255, 165, 0, 0.5)",
    accentGlow: "rgba(255, 165, 0, 0.25)",
    Icon: LinuxIcon,
    role: "Production VPS Administration & Kernel Hardening",
    activeProjects: ["node-01 (160.250.247.142)", "kali-workstation"],
    ecosystem: ["Systemd", "Iptables / UFW", "SSH Keys Hardening", "PM2", "Bash / POSIX"],
    description:
      "Quản trị toàn diện cụm máy chủ VPS Linux production. Tinh chỉnh TCP socket qua sysctl, thiết lập tường lửa iptables, bảo mật SSH không mật khẩu và cluster PM2.",
    docsUrl: "https://kernel.org",
  },
  {
    id: "javascript",
    name: "JavaScript",
    version: "ESNext // Async & Web APIs",
    category: "LANGUAGES",
    brandColor: "#F7DF1E",
    accentBorder: "rgba(247, 223, 30, 0.5)",
    accentGlow: "rgba(247, 223, 30, 0.25)",
    Icon: JavaScriptIcon,
    role: "Core Web Runtime & Modern ECMAScript Standard",
    activeProjects: ["all-web-apps", "discord-badge"],
    ecosystem: ["ES Modules", "Web Streams", "Event Loop", "V8", "Closures"],
    description:
      "Nắm vững sâu sắc cơ chế hoạt động của JavaScript: Event Loop, Microtask Queue, Prototype Chain, Memory Leaks profiling và tối ưu hóa runtime execution.",
    docsUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: "php",
    name: "PHP 8.3",
    version: "v8.3 // JIT & Strict OOP",
    category: "BACKEND",
    brandColor: "#777BB4",
    accentBorder: "rgba(119, 123, 180, 0.5)",
    accentGlow: "rgba(119, 123, 180, 0.25)",
    Icon: PhpIcon,
    role: "Dynamic Web Services, MVC & Legacy Integration",
    activeProjects: ["legacy-payment-gateways", "custom-cms"],
    ecosystem: ["Laravel", "Composer", "PHP-FPM", "OpCache", "PDO", "Attributes"],
    description:
      "Kinh nghiệm dày dặn từ những ngày đầu khởi nghiệp. Xây dựng web động, RESTful APIs, tối ưu OpCache, xử lý giao dịch thanh toán và cấu trúc code Clean Architecture.",
    docsUrl: "https://www.php.net",
  },
  {
    id: "mysql",
    name: "MySQL / MariaDB",
    version: "v8.4 LTS // InnoDB Engine",
    category: "DATABASE",
    brandColor: "#00758F",
    accentBorder: "rgba(0, 117, 143, 0.5)",
    accentGlow: "rgba(242, 145, 17, 0.25)",
    Icon: MySqlIcon,
    role: "Relational Data Modeling & Transaction Management",
    activeProjects: ["ecommerce-store", "devstore-v2"],
    ecosystem: ["InnoDB", "Replication", "Query Optimizer", "Indexing", "Transactions"],
    description:
      "Thiết kế cơ sở dữ liệu quan hệ chuẩn hóa 3NF, phân tích EXPLAIN tối ưu hóa câu lệnh truy vấn phức tạp, cấu hình connection pooling và bảo vệ toàn vẹn dữ liệu.",
    docsUrl: "https://www.mysql.com",
  },
  {
    id: "cpp",
    name: "C / C++",
    version: "ISO C++20 // Low-Level",
    category: "SYSTEMS",
    brandColor: "#00599C",
    accentBorder: "rgba(0, 89, 156, 0.5)",
    accentGlow: "rgba(0, 89, 156, 0.25)",
    Icon: CppIcon,
    role: "Microcontroller Firmware, Arduino & Systems",
    activeProjects: ["arduino-hardware", "native-extensions"],
    ecosystem: ["Arduino Core", "Pointers & Memory", "Direct Registers", "Serial Comms"],
    description:
      "Lập trình nhúng vi điều khiển Arduino, tương tác trực tiếp với thanh ghi phần cứng (GPIO, Timers, Interrupts), giao tiếp UART/I2C/SPI và tối ưu tài nguyên RAM vi mô.",
    docsUrl: "https://isocpp.org",
  },
  {
    id: "git",
    name: "Git & Actions",
    version: "v2.48 // CI/CD Automation",
    category: "DEVOPS",
    brandColor: "#F05032",
    accentBorder: "rgba(240, 80, 50, 0.5)",
    accentGlow: "rgba(240, 80, 50, 0.25)",
    Icon: GitIcon,
    role: "Distributed VCS, Rebase Workflows & CI/CD Pipelines",
    activeProjects: ["all-repositories", "automated-deploy"],
    ecosystem: ["GitHub Actions", "Git Hooks", "Semantic Versioning", "SSH Signing"],
    description:
      "Quản lý mã nguồn phân tán chuẩn công nghiệp: quy trình Gitflow/Trunk-based, rebase sạch sẽ, tự động hóa build, test và deployment lên VPS qua GitHub Actions webhook.",
    docsUrl: "https://git-scm.com",
  },
  {
    id: "bash",
    name: "Bash / Zsh",
    version: "POSIX Shell // Server Scripts",
    category: "AUTOMATION",
    brandColor: "#4EAA25",
    accentBorder: "rgba(78, 170, 37, 0.5)",
    accentGlow: "rgba(78, 170, 37, 0.25)",
    Icon: BashIcon,
    role: "Linux Server Provisioning & Automated Orchestration",
    activeProjects: ["vps-deploy-scripts", "cron-automations"],
    ecosystem: ["Sed", "Awk", "Cronjobs", "Systemd Units", "CURL / JQ", "SSH Automation"],
    description:
      "Tự động hóa hoàn toàn quy trình bảo trì máy chủ Linux: backup cơ sở dữ liệu định kỳ, dọn dẹp log ổ cứng tự động, restart service khi quá tải và monitor tiến trình.",
    docsUrl: "https://www.gnu.org/software/bash",
  },
  {
    id: "graphql",
    name: "GraphQL",
    version: "Specification // Declarative",
    category: "API",
    brandColor: "#E10098",
    accentBorder: "rgba(225, 0, 152, 0.5)",
    accentGlow: "rgba(225, 0, 152, 0.25)",
    Icon: GraphqlIcon,
    role: "Declarative Data Fetching & Precise Client Queries",
    activeProjects: ["github-subgraph", "analytics-api"],
    ecosystem: ["Apollo Server", "Schema Definition", "Resolvers", "Type-safe Codegen"],
    description:
      "Thiết kế API linh hoạt giúp client lấy chính xác dữ liệu cần thiết, loại bỏ hoàn toàn tình trạng over-fetching/under-fetching, tích hợp mạnh mẽ với GitHub API v4.",
    docsUrl: "https://graphql.org",
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    version: "v6.x // Type-Safe Schema",
    category: "DATABASE",
    brandColor: "#5A67D8",
    accentBorder: "rgba(90, 103, 216, 0.5)",
    accentGlow: "rgba(90, 103, 216, 0.25)",
    Icon: PrismaIcon,
    role: "Declarative Schema Modeling & Type-Safe Queries",
    activeProjects: ["devstore-backend", "profile-db"],
    ecosystem: ["Prisma Client", "Prisma Migrate", "Relations", "PostgreSQL Adapter"],
    description:
      "Định nghĩa schema cơ sở dữ liệu khai báo, tự động generate TypeScript types chuẩn 100%, quản lý migration an toàn và thực thi truy vấn quan hệ không sợ lỗi runtime.",
    docsUrl: "https://www.prisma.io",
  },
  {
    id: "nginx",
    name: "Nginx",
    version: "v1.26 // Reverse Proxy",
    category: "INFRASTRUCTURE",
    brandColor: "#009639",
    accentBorder: "rgba(0, 150, 57, 0.5)",
    accentGlow: "rgba(0, 150, 57, 0.25)",
    Icon: NginxIcon,
    role: "Edge Reverse Proxy, SSL Termination & Rate Limiting",
    activeProjects: ["vps-badge", "domain-routing"],
    ecosystem: ["SSL/TLS Let's Encrypt", "HTTP/2", "Load Balancing", "Gzip / Brotli"],
    description:
      "Bộ điều hướng cổng vào cho toàn bộ hệ thống web trên VPS Production. Cấu hình chứng chỉ SSL tự động gia hạn, nén gzip/brotli và bảo vệ server chống tấn công DoS.",
    docsUrl: "https://nginx.org",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    version: "v0.115 // Starlette Core",
    category: "BACKEND",
    brandColor: "#009688",
    accentBorder: "rgba(0, 150, 136, 0.5)",
    accentGlow: "rgba(0, 150, 136, 0.25)",
    Icon: FastApiIcon,
    role: "High-Speed Async Python Microservices",
    activeProjects: ["ai-agent-services", "automation-workers"],
    ecosystem: ["Pydantic v2", "Uvicorn", "Async/Await", "OpenAPI Specs"],
    description:
      "Phát triển các microservice xử lý dữ liệu và AI backend với Python. Khai báo schema tự động validate bằng Pydantic, hỗ trợ async/await non-blocking với tốc độ ngang ngửa NodeJS/Go.",
    docsUrl: "https://fastapi.tiangolo.com",
  },
  {
    id: "bun",
    name: "Bun",
    version: "v1.2 // JavaScriptCore",
    category: "RUNTIME",
    brandColor: "#E3A857",
    accentBorder: "rgba(227, 168, 87, 0.5)",
    accentGlow: "rgba(227, 168, 87, 0.25)",
    Icon: BunIcon,
    role: "Ultra-Fast JavaScript Runtime & Native Bundler",
    activeProjects: ["scripts-runner", "local-dev-tools"],
    ecosystem: ["Native SQLite", "Bun.serve", "Package Manager", "TypeScript Native"],
    description:
      "Môi trường runtime JavaScript siêu tốc thế hệ mới trên nền JavaScriptCore. Khởi động tức thì, chạy trực tiếp file TypeScript không cần bước build và cài đặt thư viện nhanh gấp 10x.",
    docsUrl: "https://bun.sh",
  },
  {
    id: "websocket",
    name: "WebSocket",
    version: "RFC 6455 // Full-Duplex",
    category: "NETWORK",
    brandColor: "#FF6600",
    accentBorder: "rgba(255, 102, 0, 0.5)",
    accentGlow: "rgba(255, 102, 0, 0.25)",
    Icon: WebSocketIcon,
    role: "Real-time Bidirectional Data Channels & Gateway",
    activeProjects: ["discord-gateway", "live-telemetry", "devstore-chat"],
    ecosystem: ["Heartbeat Ping/Pong", "Gateway Shards", "Binary Protocols", "Reconnect Loop"],
    description:
      "Thiết lập kênh truyền thông 2 chiều thời gian thực (Full-Duplex). Kết nối trực tiếp Discord Gateway WebSocket, xử lý hàng triệu sự kiện state sync với cơ chế tự động reconnect và exponential backoff.",
    docsUrl: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  },
];

export function TechStack() {
  const [selected, setSelected] = useState<TechItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
    }, 180);
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

  return (
    <div>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2 font-sans text-xs sm:text-sm text-[#EDEDEF] font-semibold">
          <Cpu className="size-4 text-indigo-400" />
          <span>Core Engineering Stack</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-white/45">
          <span className="hidden sm:inline">[Click chip for specs]</span>
          <span className="text-indigo-400 font-medium">[{TECH_ITEMS.length} Technologies]</span>
        </div>
      </div>

      {/* Grid of Interactive Badges - Spaced Out & Airy */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {TECH_ITEMS.map((item) => {
          const Icon = item.Icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setIsClosing(false);
                setSelected(item);
              }}
              className="group/chip inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#16171b]/70 px-3 sm:px-3.5 py-2 font-sans text-xs font-medium text-[#EDEDEF] transition-all duration-150 hover:border-indigo-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_16px_rgba(99,102,241,0.2)] active:scale-[0.97] cursor-pointer select-none text-left"
              title={`Xem chi tiết kiến trúc ${item.name}`}
            >
              <Icon className="size-4 shrink-0 transition-transform duration-150 group-hover/chip:scale-110" />
              <span className="tracking-tight">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* LINEAR SPECIFICATION MODAL (PORTAL) */}
      {mounted && selected && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-md transition-opacity duration-200 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleClose}
        >
          <div
            className={`relative w-full max-w-md my-auto rounded-2xl border border-white/[0.1] bg-[#0c0d12]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-200 overflow-hidden ${
              isClosing
                ? "opacity-0 scale-95 translate-y-2"
                : "opacity-100 scale-100 translate-y-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle Brand Color Accent Bloom */}
            <div
              className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-64 rounded-full blur-3xl opacity-25 transition-all duration-300"
              style={{ background: selected.accentGlow }}
            />

            {/* Header: Category Badge + ESC / Close */}
            <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 font-mono text-[10.5px]">
                <span className="size-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                <span className="text-white/60 uppercase tracking-wider font-semibold">
                  {selected.category} SPECIFICATION
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Đóng"
                className="flex size-6 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Hero Tech Identity */}
            <div className="relative mt-4 flex items-center gap-3.5">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-black/50 p-2.5 shadow-sm"
                style={{ borderColor: selected.accentBorder }}
              >
                <selected.Icon className="size-7" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 id={titleId} className="font-sans text-base sm:text-lg font-bold text-white tracking-tight truncate">
                    {selected.name}
                  </h3>
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9.5px] text-white/60 shrink-0">
                    {selected.version}
                  </span>
                </div>
                <p className="text-xs text-[#8A8F98] truncate mt-0.5 font-sans">
                  {selected.role}
                </p>
              </div>
            </div>

            {/* Active Production Deployments (Real Projects) */}
            <div className="relative mt-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 font-mono text-xs">
              <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-semibold">
                ACTIVE IN PRODUCTION PROJECTS:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.activeProjects.map((proj) => (
                  <span
                    key={proj}
                    className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10.5px] font-medium text-indigo-300"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* Practical Architectural Deployment Notes */}
            <div className="relative mt-3 rounded-xl border border-white/[0.06] bg-black/40 p-3 text-xs leading-relaxed text-[#EDEDEF]/85 font-sans">
              <div className="mb-1 font-mono text-[10px] uppercase text-indigo-400 font-semibold flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-indigo-400" />
                <span>PRODUCTION ARCHITECTURE:</span>
              </div>
              <p className="text-[11.5px] text-[#8A8F98] leading-relaxed">
                {selected.description}
              </p>
            </div>

            {/* Ecosystem & Libraries */}
            <div className="relative mt-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1.5 font-semibold">
                KEY ECOSYSTEM & MODULES:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.ecosystem.map((mod) => (
                  <span
                    key={mod}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-white/70"
                  >
                    #{mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="relative mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-xs">
              <a
                href={selected.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-white/80 transition-all duration-150 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <span>Documentation</span>
                <ExternalLink className="size-3 group-hover:translate-x-0.5 transition-transform text-white/50 group-hover:text-white" />
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs text-white/50 hover:bg-white/[0.05] hover:text-white transition-colors cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
