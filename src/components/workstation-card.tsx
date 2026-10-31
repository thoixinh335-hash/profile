"use client";

import { useState } from "react";
import {
  VsCodeIcon,
  BrowserIcon,
  KaliLinuxIcon,
  ArduinoIcon,
} from "@/components/tech-icons";
import {
  Terminal as TerminalIcon,
  Cpu,
  ChevronDown,
  Sparkles,
  Palette,
  Zap,
  Bot,
} from "lucide-react";

const MILESTONES = [
  {
    step: "01",
    phase: "Genesis",
    title: "Starting with Arduino & VS Code",
    dotColor: "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
    badgeColor: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    description:
      "Sparked by passion for Arduino hardware & microcontrollers, mastering VS Code, writing early C/C++ and foundational HTML/CSS/JS algorithms.",
    tags: ["Arduino (C/C++)", "VS Code", "HTML/CSS/JS", "Algorithmic Logic"],
  },
  {
    step: "02",
    phase: "Core Mastery",
    title: "Full-Stack Web with PHP & MySQL",
    dotColor: "bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]",
    badgeColor: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    description:
      "Architecting clean UI/UX interfaces on VS Code, building robust dynamic web platforms with PHP, optimizing relational MySQL schemas, and shipping end-to-end production web apps.",
    tags: ["PHP", "MySQL", "UI/UX Design", "Dynamic Web", "Database Schema"],
  },
  {
    step: "03",
    phase: "Scaling Up",
    title: "Transition to Next.js & Go Backend",
    dotColor: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    description:
      "Modernizing the stack: React/Next.js (App Router, Turbopack), ultra-low latency Go Fiber backends, Redis in-memory caching, real-time WebSockets, and automated bank payment gateways.",
    tags: ["Next.js 16", "React 19", "Go Fiber", "Redis", "TypeScript"],
  },
  {
    step: "04",
    phase: "Modern Frontier",
    title: "AI Explosion • 10x Productivity & Agentic Workflows",
    dotColor: "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.9)]",
    badgeColor: "border-purple-500/40 bg-purple-500/15 text-purple-200",
    description:
      "Harnessing next-gen frontier AI models and agentic coding workflows in VS Code. Accelerating delivery cycles, multiplying engineering output 10x, and building complex web architectures with extreme velocity.",
    tags: ["Agentic AI", "10x Productivity", "VS Code Agents", "High Velocity"],
  },
];

const WORKSTATION_ITEMS = [
  {
    name: "VS Code",
    role: "Editor",
    Icon: VsCodeIcon,
    brandColor: "#007ACC",
    glowColor: "rgba(0, 122, 204, 0.7)",
  },
  {
    name: "FireFox, Chrome",
    role: "Browser",
    Icon: BrowserIcon,
    brandColor: "#FF7139",
    glowColor: "rgba(255, 113, 57, 0.7)",
  },
  {
    name: "Kali Linux 2024.4",
    role: "Rolling Release • OS",
    Icon: KaliLinuxIcon,
    brandColor: "#2782F6",
    glowColor: "rgba(39, 130, 246, 0.7)",
  },
  {
    name: "Arduino",
    role: "Hardware & Embedded",
    Icon: ArduinoIcon,
    brandColor: "#00979D",
    glowColor: "rgba(0, 151, 157, 0.7)",
  },
  {
    name: "Kali Terminal • zsh",
    role: "CLI & Shell Environment",
    Icon: TerminalIcon,
    brandColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.7)",
  },
];

export function WorkstationCard() {
  const [showMilestones, setShowMilestones] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. WORKSTATION MAIN HEADER & GRID (MATCHING REFERENCE EXACTLY) */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-6 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all hover:border-white/15">
        <h3 className="text-xl font-bold tracking-tight text-[#EDEDEF]">
          Workstation
        </h3>
        <p className="text-xs text-[#8A8F98] mt-1">
          Daily development environment, hardware & workstation setup
        </p>

        {/* 2-Column Luxury Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mt-6">
          {WORKSTATION_ITEMS.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3.5 group p-2 -m-2 rounded-xl transition-all duration-200 hover:bg-white/[0.02] cursor-default"
            >
              {/* Borderless Icon Container (No box border) */}
              <div className="size-11 sm:size-12 flex items-center justify-center shrink-0 relative transition-transform duration-300 group-hover:scale-110">
                <div className="relative size-6 sm:size-7 flex items-center justify-center">
                  {/* 1. Base Inactive Icon (0% Muted State) */}
                  <item.Icon className="size-6 sm:size-7 text-white/40 transition-colors duration-300 group-hover:text-white/20" />

                  {/* 2. Loading Color Icon (0% -> 100% Clip-path Fill Animation) */}
                  <div
                    className="icon-load-fill absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                      color: item.brandColor,
                      filter: `drop-shadow(0 0 10px ${item.glowColor})`,
                    }}
                  >
                    <item.Icon className="size-6 sm:size-7" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm sm:text-base text-[#EDEDEF] group-hover:text-white transition-colors tracking-tight">
                  {item.name}
                </h4>
                <p className="text-xs text-[#8A8F98]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hardware & System Specifications */}
        <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Cpu className="size-3.5 text-indigo-400" />
              <span className="text-xs font-medium text-[#EDEDEF]">Hardware Specifications</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              ROG Zephyrus G14
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2">
              <p className="text-[10px] text-white/40">CPU</p>
              <p className="text-white font-medium truncate" title="Intel Core i7-13700H (14C/20T, 5.0GHz)">Intel i7-13700H</p>
            </div>
            <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2">
              <p className="text-[10px] text-white/40">RAM</p>
              <p className="text-white font-medium tabular-nums" title="32GB Dual-Channel DDR5 5600MHz">32.0 GB DDR5</p>
            </div>
            <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2">
              <p className="text-[10px] text-white/40">STORAGE</p>
              <p className="text-white font-medium tabular-nums" title="1TB PCIe 4.0 NVMe SSD (7000MB/s)">1.0 TB NVMe Gen4</p>
            </div>
            <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2">
              <p className="text-[10px] text-white/40">GPU</p>
              <p className="text-white font-medium truncate" title="NVIDIA GeForce RTX 4060 (8GB GDDR6)">RTX 4060 8GB</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TECHNICAL MILESTONES (COLLAPSIBLE / ACCORDION) */}
      <div className="rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md overflow-hidden transition-all">
        <button
          onClick={() => setShowMilestones(!showMilestones)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
        >
          <div>
            <h4 className="font-semibold text-xs text-[#EDEDEF]">
              Engineering Milestones & Roadmap
            </h4>
            <p className="text-[11px] text-[#8A8F98] mt-0.5">
              From Arduino hardware, mastering PHP/MySQL to Next.js & AI agentic workflows
            </p>
          </div>
          <ChevronDown
            className={`size-4 text-white/40 transition-transform duration-200 ${
              showMilestones ? "rotate-180 text-white" : ""
            }`}
          />
        </button>

        {showMilestones && (
          <div className="border-t border-white/[0.06] p-4 space-y-3">
            {MILESTONES.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-white/[0.06] bg-black/30 p-3.5 transition-all hover:border-indigo-500/30"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`size-1.5 rounded-full ${item.dotColor}`} />
                    <span className="font-mono text-[10px] font-bold text-white/40">
                      {item.step}
                    </span>
                    <h5 className="font-semibold text-xs text-[#EDEDEF]">
                      {item.title}
                    </h5>
                  </div>
                  <span
                    className={`rounded-md border px-2 py-0.5 font-mono text-[9px] font-medium ${item.badgeColor}`}
                  >
                    {item.phase}
                  </span>
                </div>
                <p className="text-xs text-[#8A8F98] leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[9.5px] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

