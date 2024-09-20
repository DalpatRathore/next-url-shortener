import { Button } from "./ui/button";
import { CalendarIcon, Copy, EyeIcon, Link } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatDateTime, formatShortenedUrl } from "@/lib/formatter";

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
      <li className="flex flex-col md:flex-row items-start gap-3">
        <div className="flex items-start justify-start flex-1 gap-2">
          <div className="flex flex-col items-center justify-center gap-4 translate-y-3">
            <Link className="w-4 h-4"></Link>
            <div className="flex h-2 w-2 rounded-full bg-sky-500" />
          </div>
          <div className="w-full">
            <Button
              variant={"link"}
              asChild
              className="text-blue-500 hover:text-blue-600 p-0 text-sm lg:text-lg"
            >
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                {shortenedUrl}
              </a>
            </Button>
            <p className="text-sm text-muted-foreground break-all">
              {originalUrl + originalUrl}
            </p>
            <p className="inline-flex items-center gap-2 bg-gray-200 px-2 py-1 text-xs mt-2 rounded-sm">
              <CalendarIcon className="h-4 w-4" />
              {formatDateTime(createdAt)}
            </p>
          </div>
        </div>
        <div className="w-full md:w-20 flex md:flex-col gap-3 justify-end">
          <Button
            variant={"outline"}
            className="ml-2 cursor-not-allowed"
            title="url visited"
          >
            {views}
            <EyeIcon className="w-4 h-4 ml-2" />
            <span className="sr-only">Views</span>
          </Button>
          <Button
            type="button"
            // variant={"outline"}
            // size={"icon"}
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
