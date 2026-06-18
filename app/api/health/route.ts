import { NextResponse } from "next/server";

/** Lightweight liveness probe. */
export function GET() {
  return NextResponse.json({ status: "ok", service: "pjs-gumbo-platform" });
}
