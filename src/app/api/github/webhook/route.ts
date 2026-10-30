import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "github-commits.json");

export async function POST(request: Request) {
  try {
    const event = request.headers.get("x-github-event");
    const contentType = request.headers.get("content-type") || "";

    let payload: any = null;

    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      const rawPayload = formData.get("payload");
      if (rawPayload && typeof rawPayload === "string") {
        payload = JSON.parse(rawPayload);
      }
    } else {
      try {
        payload = await request.json();
      } catch {
        const text = await request.text();
        if (text.startsWith("payload=")) {
          payload = JSON.parse(decodeURIComponent(text.replace("payload=", "")));
        }
      }
    }

    if (!payload) {
      return NextResponse.json({ success: false, error: "Empty or unrecognized payload" }, { status: 400 });
    }

    if (event === "push") {
      const repo = payload.repository?.full_name || "thoixinh335-hash/project";
      const repoShort = payload.repository?.name || "project";
      const isPrivate = Boolean(payload.repository?.private);
      const headCommit = payload.head_commit;

      if (headCommit) {
        const newCommit = {
          repo,
          repoShort,
          sha: headCommit.id ? headCommit.id.slice(0, 7) : "latest",
          message: (headCommit.message || "").split("\n")[0].slice(0, 80),
          author: headCommit.author?.name || "Duc Huy",
          date: headCommit.timestamp || new Date().toISOString(),
          timeAgo: "just now",
          url: headCommit.url || `https://github.com/${repo}/commit/${headCommit.id}`,
          isPrivate,
        };

        try {
          await fs.mkdir(path.dirname(FILE), { recursive: true });
          let existing: typeof newCommit[] = [];
          try {
            const raw = await fs.readFile(FILE, "utf-8");
            existing = JSON.parse(raw);
          } catch {
            existing = [];
          }

          // Prepend new commit and keep top 20
          existing = [newCommit, ...existing.filter((c) => c.sha !== newCommit.sha)].slice(0, 20);
          await fs.writeFile(FILE, JSON.stringify(existing, null, 2), "utf-8");
        } catch (writeErr) {
          console.error("Failed to persist webhook commit:", writeErr);
        }

        return NextResponse.json({
          success: true,
          event: "push",
          commit: newCommit,
        });
      }
    }

    // Ping event or other events
    return NextResponse.json({ success: true, event: event || "ping", message: "Webhook acknowledged" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 400 });
  }
}
