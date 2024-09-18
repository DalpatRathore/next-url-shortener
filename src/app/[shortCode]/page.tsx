import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const RedirectPage = async ({ params }: { params: { shortCode: string } }) => {
  const { shortCode } = params;
  const url = await prisma.url.findUnique({
    where: {
      shortCode: shortCode,
    },
  });
  if (!url) {
    return <div className="">404 - URL not found</div>;
  }
  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: { views: { increment: 1 } },
  });
  redirect(url.originalUrl);
};

export default RedirectPage;
