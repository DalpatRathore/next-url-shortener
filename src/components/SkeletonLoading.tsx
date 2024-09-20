import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "./ui/separator";
const SkeletonLoading = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="" key={index}>
          <div className="flex items-start justify-center gap-5">
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
              <div className="space-y-1">
                <Skeleton className="h-7 w-7 rounded" />
              </div>
            </div>
          </div>
          <Separator className="my-3"></Separator>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoading;
