import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation"; // Built-in 404 page

const RedirectPage = async ({ params }: { params: { shortCode: string } }) => {
  const { shortCode } = params;
  const url = await prisma.url.findUnique({
    where: {
      shortCode: shortCode,
    },
  });
  // If no URL is found, trigger Next.js's built-in 404 page
  if (!url) {
    notFound();
  }
  // Increment the view count for the URL
  await prisma.url.update({
    where: { id: url.id },
    data: { views: { increment: 1 } },
  });

  // Redirect to the original URL
  redirect(url.originalUrl);
};

export default RedirectPage;
