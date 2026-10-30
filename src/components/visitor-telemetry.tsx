"use client";

import { useEffect } from "react";

export function VisitorTelemetry() {
  useEffect(() => {
    // Only fire once per session to avoid duplicate pings on navigation
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("sec_telemetry_sent")) return;
      sessionStorage.setItem("sec_telemetry_sent", "true");

      const payload = {
        referrer: document.referrer || "Direct / Bookmark",
        screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
        language: navigator.language || "Unknown",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        path: window.location.pathname,
      };

      fetch("/api/telemetry/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Fail silently
    }
  }, []);

  return null;
}

