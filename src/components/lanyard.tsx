"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export type Activity = {
  id: string;
  name: string;
  type: number;
  details?: string;
  state?: string;
  application_id?: string;
  created_at?: number;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
};

export type DiscordUser = {
  id: string;
  username: string;
  global_name?: string | null;
  display_name?: string | null;
  discriminator?: string;
  avatar: string | null;
  avatar_decoration_data: { asset: string; expires_at?: string } | null;
};

export type LanyardPresence = {
  discord_user: DiscordUser;
  discord_status: DiscordStatus;
  activities: Activity[];
  spotify: {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: { start: number; end: number };
  } | null;
};

const Ctx = createContext<LanyardPresence | null>(null);

export function useLanyard() {
  return useContext(Ctx);
}

export function LanyardProvider({
  userId,
  children,
}: {
  userId: string;
  children: ReactNode;
}) {
  const [presence, setPresence] = useState<LanyardPresence | null>(null);

  const applyPresence = useCallback((d: LanyardPresence) => {
    setPresence(d);
  }, []);

  useEffect(() => {
    if (!userId) return;

    let ws: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let reconnect: ReturnType<typeof setTimeout> | null = null;
    let closed = false;

    fetch(`https://api.lanyard.rest/v1/users/${userId}`)
      .then((r) => r.json())
      .then((res: { success: boolean; data?: LanyardPresence }) => {
        if (res.success && res.data) applyPresence(res.data);
      })
      .catch(() => {});

    const connect = () => {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data as string) as {
            op: number;
            t?: string;
            d: LanyardPresence & { heartbeat_interval?: number };
          };

          if (msg.op === 1) {
            ws?.send(
              JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }),
            );
            heartbeat = setInterval(() => {
              try {
                ws?.send(JSON.stringify({ op: 3 }));
              } catch {
                // Connection closing
              }
            }, msg.d.heartbeat_interval ?? 30000);
          }

          if (
            msg.op === 0 &&
            (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")
          ) {
            applyPresence(msg.d);
          }
        } catch (err) {
          console.warn("Lanyard WebSocket error:", err);
        }
      };

      ws.onclose = () => {
        if (heartbeat) clearInterval(heartbeat);
        if (!closed) reconnect = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      closed = true;
      if (reconnect) clearTimeout(reconnect);
      if (heartbeat) clearInterval(heartbeat);
      ws?.close();
    };
  }, [userId, applyPresence]);

  return <Ctx.Provider value={presence}>{children}</Ctx.Provider>;
}
