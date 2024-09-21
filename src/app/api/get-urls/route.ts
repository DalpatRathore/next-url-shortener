import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Force dynamic rendering for this API
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const urls = await prisma.url.findMany({
      orderBy: { createdAt: "desc" },
      take: 5, // Only fetch the latest 5 URLs
    });

    return NextResponse.json({ data: urls }, { status: 200 });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
