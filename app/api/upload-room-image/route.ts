import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: false,
    message:
      "Upload endpoint je placeholder. Sledeci korak je Vercel Blob integracija za slike soba."
  });
}
