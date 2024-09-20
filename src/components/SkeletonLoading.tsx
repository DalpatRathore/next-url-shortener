import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
const SkeletonLoading = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center justify-center gap-2">
          <Skeleton className="h-20 w-10 rounded" />
          <Skeleton className="h-20 w-full rounded" />
          <div className="space-y-1">
            <Skeleton className="h-10 w-10 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoading;
