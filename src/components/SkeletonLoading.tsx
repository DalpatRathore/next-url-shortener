import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
const SkeletonLoading = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-start justify-center gap-2">
          <div className="w-full flex gap-1">
            <div className="flex flex-col items-center justify-start gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="w-full flex flex-col space-y-1">
              <Skeleton className="h-6 w-full rounded" />
              <Skeleton className="h-6 w-full rounded" />
              <div className="flex space-x-1">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-10 rounded" />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Skeleton className="h-10 w-10 rounded" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoading;
