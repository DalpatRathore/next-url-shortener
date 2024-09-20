import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define a zod schema for URL validation
const urlSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the incoming request body
    const body = await request.json();
    const parsedData = urlSchema.parse(body);

    const { url } = parsedData;

    // Generate a unique shortcode using nanoid
    const shortCode = nanoid(8);

    // Check if the URL already exists in the database
    const existingUrl = await prisma.url.findUnique({
      where: { originalUrl: url },
    });

    // If the URL is already shortened, return the existing shortcode
    if (existingUrl) {
      return NextResponse.json(existingUrl);
    }

    // Save the original URL and shortcode to the database
    const shortenedUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });


    // Return the generated shortcode
    return NextResponse.json(shortenedUrl);
  } catch (error) {
    // Handle validation and database errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    console.error("Error creating shortened URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
