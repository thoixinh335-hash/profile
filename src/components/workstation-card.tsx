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
  Layers,
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
    phase: "Khởi Đầu",
    title: "Bắt Đầu Với Arduino & VS Code",
    dotColor: "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
    badgeColor: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    description:
      "Khởi đầu với sự say mê phần cứng Arduino & vi điều khiển, làm quen với text editor VS Code, viết những dòng lệnh C/C++ và HTML/CSS/JS đầu tiên, rèn luyện tư duy logic thuật toán.",
    tags: ["Arduino (C/C++)", "VS Code", "HTML/CSS/JS", "Tư Duy Logic"],
  },
  {
    step: "02",
    phase: "Làm Chủ Nền Tảng",
    title: "Thông Thạo Thiết Kế Với PHP & MySQL",
    dotColor: "bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]",
    badgeColor: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    description:
      "Nắm vững thiết kế giao diện UI/UX trực quan trên VS Code, phát triển web động chuyên sâu với PHP, tối ưu cơ sở dữ liệu quan hệ MySQL và hoàn thiện các website thực tế từ frontend đến database.",
    tags: ["PHP", "MySQL", "Thiết Kế UI/UX", "Web Động", "Database Schema"],
  },
  {
    step: "03",
    phase: "Mở Rộng Quy Mô",
    title: "Chuyển Dịch Next.js & Go Backend",
    dotColor: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    description:
      "Nâng cấp stack lên hệ sinh thái hiện đại: React/Next.js (App Router, Turbopack), Go Fiber hiệu năng cao, Redis in-memory cache, WebSocket và tự động hóa thanh toán ngân hàng.",
    tags: ["Next.js 16", "React 19", "Go Fiber", "Redis", "TypeScript"],
  },
  {
    step: "04",
    phase: "Bứt Phá Hiện Tại",
    title: "AI Bùng Nổ • Năng Suất & Hiệu Quả Đột Phá",
    dotColor: "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.9)]",
    badgeColor: "border-purple-500/40 bg-purple-500/15 text-purple-200",
    description:
      "Tận dụng sức mạnh đột phá của các mô hình AI tiên tiến, tích hợp Agentic Coding Workflows vào VS Code. Tối ưu hóa chu trình phát triển, nhân bản năng suất x10 và hoàn thiện các giải pháp web phức tạp với tốc độ vượt bậc.",
    tags: ["Agentic AI", "Năng Suất x10", "VS Code Copilot/Agents", "Tối Ưu Hiệu Quả"],
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
          Thiết bị, hệ điều hành & môi trường lập trình hàng ngày
        </p>

        {/* 2-Column Luxury Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mt-6">
          {/* 1. VS Code */}
          <div className="flex items-center gap-3.5 group p-2 -m-2 rounded-xl transition-all duration-200 hover:bg-white/[0.02] cursor-default">
            <div className="size-11 sm:size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-[#007ACC]/50 group-hover:bg-[#007ACC]/10 group-hover:shadow-[0_0_20px_rgba(0,122,204,0.3)]">
              <VsCodeIcon className="size-6 sm:size-7 text-white/90 group-hover:text-[#007ACC] transition-all duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#EDEDEF] group-hover:text-white transition-colors tracking-tight">
                VS Code
              </h4>
              <p className="text-xs text-[#8A8F98]">Editor</p>
            </div>
          </div>

          {/* 2. FireFox, Chrome */}
          <div className="flex items-center gap-3.5 group p-2 -m-2 rounded-xl transition-all duration-200 hover:bg-white/[0.02] cursor-default">
            <div className="size-11 sm:size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-[#FF7139]/50 group-hover:bg-[#FF7139]/10 group-hover:shadow-[0_0_20px_rgba(255,113,57,0.3)]">
              <BrowserIcon className="size-6 sm:size-7 text-white/90 group-hover:text-[#FF7139] transition-all duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#EDEDEF] group-hover:text-white transition-colors tracking-tight">
                FireFox, Chrome
              </h4>
              <p className="text-xs text-[#8A8F98]">Browser</p>
            </div>
          </div>

          {/* 3. Kali Linux 2024.4 */}
          <div className="flex items-center gap-3.5 group p-2 -m-2 rounded-xl transition-all duration-200 hover:bg-white/[0.02] cursor-default">
            <div className="size-11 sm:size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-[#2782F6]/50 group-hover:bg-[#2782F6]/10 group-hover:shadow-[0_0_24px_rgba(39,130,246,0.4)]">
              <KaliLinuxIcon className="size-6 sm:size-7 text-white/90 group-hover:text-[#2782F6] transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(39,130,246,0.3)]" />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#EDEDEF] group-hover:text-white transition-colors tracking-tight">
                Kali Linux 2024.4
              </h4>
              <p className="text-xs text-[#8A8F98]">Rolling Release • OS</p>
            </div>
          </div>

          {/* 4. Arduino */}
          <div className="flex items-center gap-3.5 group p-2 -m-2 rounded-xl transition-all duration-200 hover:bg-white/[0.02] cursor-default">
            <div className="size-11 sm:size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00979D]/50 group-hover:bg-[#00979D]/10 group-hover:shadow-[0_0_20px_rgba(0,151,157,0.3)]">
              <ArduinoIcon className="size-6 sm:size-7 text-white/90 group-hover:text-[#00979D] transition-all duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#EDEDEF] group-hover:text-white transition-colors tracking-tight">
                Arduino
              </h4>
              <p className="text-xs text-[#8A8F98]">Hardware & Embedded</p>
            </div>
          </div>

          {/* 5. Terminal */}
          <div className="flex items-center gap-3.5 group p-2 -m-2 rounded-xl transition-all duration-200 hover:bg-white/[0.02] cursor-default">
            <div className="size-11 sm:size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <TerminalIcon className="size-6 sm:size-7 text-white/90 group-hover:text-emerald-400 transition-all duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#EDEDEF] group-hover:text-white transition-colors tracking-tight">
                Kali Terminal • zsh
              </h4>
              <p className="text-xs text-[#8A8F98]">CLI & Shell Environment</p>
            </div>
          </div>

          {/* 6. Runtime Stack */}
          <div className="flex items-center gap-3.5 group p-2 -m-2 rounded-xl transition-all duration-200 hover:bg-white/[0.02] cursor-default">
            <div className="size-11 sm:size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00ADD8]/50 group-hover:bg-[#00ADD8]/10 group-hover:shadow-[0_0_20px_rgba(0,173,216,0.3)]">
              <Layers className="size-6 sm:size-7 text-white/90 group-hover:text-[#00ADD8] transition-all duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#EDEDEF] group-hover:text-white transition-colors tracking-tight">
                Next.js 16 • Go Fiber
              </h4>
              <p className="text-xs text-[#8A8F98]">Runtime Stack Engine</p>
            </div>
          </div>
        </div>

        {/* Cloud Infrastructure Telemetry */}
        <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Cpu className="size-3.5 text-indigo-400" />
              <span className="text-xs font-medium text-[#EDEDEF]">Infrastructure Specs</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              node-01.darkwy.internal
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2">
              <p className="text-[10px] text-white/40">CPU</p>
              <p className="text-white font-medium truncate">AMD EPYC (8c)</p>
            </div>
            <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2">
              <p className="text-[10px] text-white/40">MEMORY</p>
              <p className="text-white font-medium tabular-nums">1.8G / 16.0G</p>
            </div>
            <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2">
              <p className="text-[10px] text-white/40">STORAGE</p>
              <p className="text-white font-medium tabular-nums">276G / 512G SSD</p>
            </div>
            <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2">
              <p className="text-[10px] text-white/40">NETWORK</p>
              <p className="text-white font-medium">1 Gbps Fiber</p>
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
              Tiến Trình Kỹ Thuật & Dấu Mốc
            </h4>
            <p className="text-[11px] text-[#8A8F98] mt-0.5">
              Từ đam mê Arduino phần cứng, làm chủ PHP/MySQL đến Next.js & AI Bùng Nổ
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

