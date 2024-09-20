import { Button } from "./ui/button";
import { CalendarIcon, Copy, EyeIcon, LinkIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatDateTime, formatShortenedUrl } from "@/lib/formatter";
import Link from "next/link";

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
      alert("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy the URL", error);
    }
  };

  return (
    <>
      <li className="flex items-start gap-0">
        <div className="flex items-start justify-start flex-1 gap-2">
          <div className="flex flex-col items-center justify-center gap-4 translate-y-3">
            <LinkIcon className="w-4 h-4"></LinkIcon>
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
            <p className="text-sm text-muted-foreground break-all">
              {originalUrl + originalUrl}
            </p>
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
      <Separator className="my-5"></Separator>
    </>
  );
};

export default UrlsList;
