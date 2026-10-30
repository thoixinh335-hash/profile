"use client";
import Image from "next/image";
import { Copy, Check, X, Coffee, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function DonateButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 150);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const copy = () => {
    navigator.clipboard.writeText("0334066961").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Sponsor / Coffee Pill */}
      <div className="pointer-events-auto fixed bottom-5 z-40">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#121215]/90 px-4 py-2 text-xs font-sans font-medium text-[#EDEDEF] shadow-xl shadow-black/60 backdrop-blur-md transition-all duration-150 hover:border-indigo-500/50 hover:bg-[#18191f] hover:shadow-[0_0_24px_rgba(99,102,241,0.25)] active:scale-[0.98]"
        >
          <Coffee className="size-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Sponsor Developer</span>
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
        </button>
      </div>

      {/* Modern Linear Modal Dialog */}
      {open &&
        mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-150 ${
              closing ? "opacity-0" : "opacity-100"
            }`}
            onClick={close}
          >
            <div
              className={`linear-card relative w-full max-w-[380px] p-6 shadow-2xl transition-all duration-150 border border-white/[0.12] rounded-2xl bg-[#121215] ${
                closing ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Indigo Glow */}
              <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-52 bg-indigo-500/20 blur-2xl rounded-full" />

              {/* Close Button */}
              <button
                onClick={close}
                className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/60 hover:bg-white/[0.1] hover:text-white transition-colors"
              >
                <X className="size-3.5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Coffee className="size-5" />
                </div>
                <div className="text-left font-sans">
                  <h3 className="text-sm font-semibold text-[#EDEDEF]">
                    Buy Me a Coffee
                  </h3>
                  <p className="text-xs text-[#8A8F98]">
                    Hỗ trợ duy trì máy chủ & phát triển dự án ☕
                  </p>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="relative mx-auto mt-5 w-fit rounded-xl border border-white/[0.1] bg-white p-3 shadow-lg">
                <Image
                  src="/donate-qr.png"
                  alt="MB Bank QR Code"
                  width={240}
                  height={240}
                  className="rounded-lg object-contain"
                  priority
                />
              </div>

              {/* Account Box */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 font-sans">
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-indigo-400">
                    <Sparkles className="size-2.5" />
                    <span>MB Bank • Ngân Hàng Quân Đội</span>
                  </div>
                  <div className="mt-0.5 font-mono text-sm font-bold text-white tracking-wider tabular-nums">
                    0334066961
                  </div>
                  <div className="text-[11px] text-[#8A8F98]">
                    Chủ tài khoản: <span className="text-[#EDEDEF] font-medium">DO DUC HUY</span>
                  </div>
                </div>

                <button
                  onClick={copy}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all active:scale-[0.98] ${
                    copied
                      ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                      : "border-white/[0.08] bg-white/[0.06] text-white/80 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
