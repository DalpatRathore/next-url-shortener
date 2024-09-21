import { Button } from "./ui/button";
import { CalendarIcon, Copy, EyeIcon, LinkIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatDateTime, formatShortenedUrl } from "@/lib/formatter";
import Link from "next/link";
import toast from "react-hot-toast";

type UrlsListProps = {
  url: {
    originalUrl: string;
    shortCode: string;
    createdAt: Date;
    views: number;
  };
};

const UrlsList = ({
  url: { originalUrl, shortCode, createdAt, views },
}: UrlsListProps) => {
  // Copy shortened URL to clipboard

  const shortenedUrl = formatShortenedUrl(shortCode);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      toast.success("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy the URL", error);
    }
  };

  return (
    <>
      <li className="flex items-start gap-0">
        <div className="flex items-start justify-start flex-1 gap-2">
          <div className="flex flex-col items-center justify-center gap-4 translate-y-4">
            <LinkIcon className="w-3 h-3"></LinkIcon>
            <div className="flex h-2 w-2 rounded-full bg-sky-500" />
          </div>
          <div className="w-full">
            <Button
              variant={"link"}
              asChild
              className="text-blue-500 hover:text-blue-600 p-0 text-sm lg:text-base"
            >
              <Link
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortenedUrl}{" "}
              </Link>
            </Button>
            <div className="group relative">
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 transition-all duration-200">
                {originalUrl}
              </p>
              <span className="absolute left-0 top-full mt-1 hidden group-hover:inline-block bg-gray-800 dark:bg-gray-100 text-white dark:text-black text-xs px-2 py-1 rounded">
                {originalUrl}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <p className="inline-flex items-center gap-2 shadow bg-muted px-2 py-1 text-xs mt-2 rounded-sm">
                <CalendarIcon className="h-4 w-4" />
                {formatDateTime(createdAt)}
              </p>
              <p className="inline-flex items-center gap-2  shadow bg-muted px-2 py-1 text-xs mt-2 rounded-sm">
                <EyeIcon className="w-4 h-4" />
                {views}
                <span className="sr-only">Views</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            onClick={handleCopy}
            className="ml-2"
            title="Copy URL"
          >
            <Copy className="w-4 h-4" />
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </li>
      <Separator className="my-4"></Separator>
    </>
  );
};

export default UrlsList;
