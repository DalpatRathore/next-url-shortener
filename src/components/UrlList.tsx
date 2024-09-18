import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { CopyIcon, EyeIcon } from "lucide-react";

const UrlList = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2"> Recent URLs</h2>
      <ul className="space-y-2">
        <li className="flex items-center justify-between gap-2">
          <Link
            href={"https://ui.shadcn.com/docs/components/form"}
            className="text-blue-500"
            target="_blank"
          >
            https://ui.shadcn.com/docs/components/form
          </Link>
          <div className="flex items-center gap-3">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-muted-foreground hover:bg-muted"
            >
              <CopyIcon></CopyIcon>
              <span className="sr-only">Copy URL</span>
            </Button>
            <span className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4"></EyeIcon>
              100 views
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UrlList;
