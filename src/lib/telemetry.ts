import { promises as fs } from "fs";
import path from "path";

export interface VisitorPayload {
  referrer?: string;
  screen?: string;
  language?: string;
  timeZone?: string;
  path?: string;
}

export interface VisitorInfo {
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  isp: string;
  os: string;
  browser: string;
  device: string;
  referrer: string;
  screen: string;
  language: string;
  timeZone: string;
  path: string;
  timestamp: string;
}

// In-memory cooldown cache: prevent alert spam from the same IP within 10 minutes
const cooldowns = new Map<string, number>();
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

const DATA_DIR = path.join(process.cwd(), "data");
const VISITORS_FILE = path.join(DATA_DIR, "visitors.json");

export function isLocalIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "localhost" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.16.")
  );
}

export function parseUserAgent(ua: string) {
  let os = "Unknown OS";
  let browser = "Unknown Browser";
  let device = "Desktop";

  if (/iPhone|iPad|iPod/i.test(ua)) {
    device = "Mobile (iOS)";
    os = "iOS";
  } else if (/Android/i.test(ua)) {
    device = "Mobile (Android)";
    os = "Android";
  } else if (/Windows/i.test(ua)) {
    os = "Windows";
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = "macOS";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
  }

  if (/Edg\//i.test(ua)) browser = "Microsoft Edge";
  else if (/Chrome\//i.test(ua)) browser = "Google Chrome";
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Discord/i.test(ua)) browser = "Discord In-App";
  else if (/Telegram/i.test(ua)) browser = "Telegram In-App";

  return { os, browser, device };
}

export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  try {
    return countryCode
      .toUpperCase()
      .split("")
      .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
      .join("");
  } catch {
    return "🌐";
  }
}

import http from "http";

export function lookupGeoIp(ip: string): Promise<{
  country: string;
  countryCode: string;
  city: string;
  region: string;
  isp: string;
}> {
  if (isLocalIp(ip)) {
    return Promise.resolve({
      country: "Local Network",
      countryCode: "VN",
      city: "Internal Node",
      region: "Dev Environment",
      isp: "Localhost / Developer",
    });
  }

  return new Promise((resolve) => {
    const req = http.get(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,isp`,
      { timeout: 3500 },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          try {
            const data = JSON.parse(raw);
            if (data.status === "success") {
              return resolve({
                country: data.country || "Unknown",
                countryCode: data.countryCode || "",
                city: data.city || "Unknown City",
                region: data.regionName || "",
                isp: data.isp || "Unknown ISP",
              });
            }
          } catch {}
          resolve({
            country: "Global",
            countryCode: "",
            city: "Unknown City",
            region: "",
            isp: "Unknown Carrier",
          });
        });
      }
    );

    req.on("error", () => {
      resolve({
        country: "Global",
        countryCode: "",
        city: "Unknown City",
        region: "",
        isp: "Unknown Carrier",
      });
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({
        country: "Global",
        countryCode: "",
        city: "Unknown City",
        region: "",
        isp: "Unknown Carrier",
      });
    });
  });
}

export async function sendTelegramAlert(info: VisitorInfo) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const flag = getCountryFlag(info.countryCode);
  const text = `
🚨 <b>[TELEMETRY // NEW_VISITOR_DETECTED]</b>
━━━━━━━━━━━━━━━━━━━━
📍 <b>Location:</b> ${info.city}, ${info.country} ${flag}
🏢 <b>ISP/Network:</b> <code>${info.isp}</code>
🌐 <b>IP Address:</b> <code>${info.ip}</code>
📱 <b>Device:</b> ${info.os} • ${info.browser} (${info.device})
📐 <b>Screen:</b> <code>${info.screen}</code> • Lang: <code>${info.language}</code>
🔗 <b>Referrer:</b> <code>${info.referrer || "Direct / Bookmark"}</code>
🧭 <b>Path:</b> <code>${info.path || "/"}</code>
⏰ <b>Time:</b> <code>${info.timestamp}</code>
━━━━━━━━━━━━━━━━━━━━
<i>📡 Telemetry Engine • darkwy-portfolio</i>
`.trim();

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.error("[Telemetry] Failed to send Telegram alert:", err);
  }
}

let cachedDmChannelId: string | null = null;

export async function sendDiscordAlert(info: VisitorInfo) {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const adminId = process.env.DISCORD_ADMIN_ID || "819822563588964383";
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!botToken && !webhookUrl) return;

  const flag = getCountryFlag(info.countryCode);
  const embed = {
    title: "🌐 [PORTFOLIO // VISITOR_DETECTED]",
    description: `Khách truy cập mới tới **${info.path || "/"}**`,
    color: 0x6366f1, // Electric Indigo
    fields: [
      {
        name: "📍 Location & ISP",
        value: `${info.city}, ${info.country} ${flag}\n\`${info.isp}\``,
        inline: true,
      },
      {
        name: "🌐 IP Address",
        value: `\`${info.ip}\``,
        inline: true,
      },
      {
        name: "📱 Client System",
        value: `${info.os} • ${info.browser} (${info.device})\nScreen: \`${info.screen}\` • Lang: \`${info.language}\``,
        inline: false,
      },
      {
        name: "🔗 Source & Time",
        value: `Referrer: \`${info.referrer || "Direct Access"}\`\nTime: \`${info.timestamp}\``,
        inline: false,
      },
    ],
    footer: {
      text: "Portfolio Telemetry • Full-Stack Engineer",
    },
    timestamp: new Date().toISOString(),
  };

  // 1. Send Direct Message to Discord Admin via Bot Token
  if (botToken && adminId) {
    try {
      if (!cachedDmChannelId) {
        const chanRes = await fetch("https://discord.com/api/v10/users/@me/channels", {
          method: "POST",
          headers: {
            Authorization: `Bot ${botToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipient_id: adminId }),
          signal: AbortSignal.timeout(4000),
        });
        if (chanRes.ok) {
          const chanData = await chanRes.json();
          cachedDmChannelId = chanData.id;
        }
      }

      if (cachedDmChannelId) {
        await fetch(`https://discord.com/api/v10/channels/${cachedDmChannelId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bot ${botToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ embeds: [embed] }),
          signal: AbortSignal.timeout(4000),
        });
      }
    } catch (err) {
      console.error("[Telemetry] Failed to send Discord bot DM:", err);
    }
  }

  // 2. Send via Discord Webhook (if provided)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Visitor Sentry",
          embeds: [embed],
        }),
        signal: AbortSignal.timeout(4000),
      });
    } catch (err) {
      console.error("[Telemetry] Failed to send Discord webhook:", err);
    }
  }
}

export async function logVisitorToFile(info: VisitorInfo) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let logs: VisitorInfo[] = [];
    try {
      const data = await fs.readFile(VISITORS_FILE, "utf-8");
      logs = JSON.parse(data);
    } catch {
      logs = [];
    }
    // Prepend new visitor, keep latest 100 entries
    logs = [info, ...logs].slice(0, 100);
    await fs.writeFile(VISITORS_FILE, JSON.stringify(logs, null, 2), "utf-8");
  } catch (err) {
    console.error("[Telemetry] Failed to log visitor to file:", err);
  }
}

export async function processVisitor(ip: string, ua: string, payload: VisitorPayload) {
  const now = Date.now();
  const lastSeen = cooldowns.get(ip) || 0;

  // Rate limit check
  if (now - lastSeen < COOLDOWN_MS) {
    return { ok: true, rateLimited: true };
  }
  cooldowns.set(ip, now);

  const geo = await lookupGeoIp(ip);
  const parsedUa = parseUserAgent(ua);

  const timeFormatted = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  const info: VisitorInfo = {
    ip,
    country: geo.country,
    countryCode: geo.countryCode,
    city: geo.city,
    region: geo.region,
    isp: geo.isp,
    os: parsedUa.os,
    browser: parsedUa.browser,
    device: parsedUa.device,
    referrer: payload.referrer || "Direct",
    screen: payload.screen || "Unknown",
    language: payload.language || "Unknown",
    timeZone: payload.timeZone || "Unknown",
    path: payload.path || "/",
    timestamp: timeFormatted,
  };

  // Run alert dispatches in parallel
  await Promise.allSettled([
    sendTelegramAlert(info),
    sendDiscordAlert(info),
    logVisitorToFile(info),
  ]);

  return { ok: true, rateLimited: false, info };
}
