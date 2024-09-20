import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await prisma.url.findMany({
      orderBy: { createdAt: "desc" },
      take: 5, // Only fetch the latest 5 URLs
    });

    // Return the URLs in a structured format
    return NextResponse.json({ data: urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
