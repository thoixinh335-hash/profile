import { NextRequest, NextResponse } from "next/server";
import { processVisitor, VisitorPayload } from "@/lib/telemetry";

export async function POST(req: NextRequest) {
  try {
    let payload: VisitorPayload = {};
    try {
      payload = await req.json();
    } catch {
      payload = {};
    }

    // Extract real client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const cfIp = req.headers.get("cf-connecting-ip");
    const realIp = req.headers.get("x-real-ip");

    let ip = "127.0.0.1";
    if (cfIp) {
      ip = cfIp.trim();
    } else if (forwarded) {
      ip = forwarded.split(",")[0].trim();
    } else if (realIp) {
      ip = realIp.trim();
    }

    const ua = req.headers.get("user-agent") || "";

    const result = await processVisitor(ip, ua, payload);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[API Telemetry Visit] Error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

