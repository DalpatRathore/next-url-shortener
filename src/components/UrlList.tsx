"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckCheck, CopyIcon, EyeIcon } from "lucide-react";

type UrlList = {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  views: number;
};

const UrlList = () => {
  const [urls, setUrls] = useState<UrlList[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyUrl, setCopyUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shortenedUrl = (code: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;
  };
  const getUrls = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/urls");
      const result = await response.json();

      setUrls(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = (code: string) => {
    const fullUrl = `${shortenedUrl(code)}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setCopyUrl(code);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  useEffect(() => {
    getUrls();
  }, []);

  //   console.log(urls);
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2"> Recent URLs</h2>
      <ul className="space-y-2">
        {urls.map(url => (
          <li
            key={url.id}
            className="flex items-center justify-between gap-2 border px-3 py-1 rounded-md"
          >
            <Link
              href={`/${url.shortCode}`}
              className="text-blue-500"
              target="_blank"
            >
              {shortenedUrl(url.shortCode)}
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="text-muted-foreground hover:bg-muted"
                onClick={() => handleCopyUrl(url.shortCode)}
              >
                {copied && copyUrl === url.shortCode ? (
                  <CheckCheck></CheckCheck>
                ) : (
                  <CopyIcon></CopyIcon>
                )}

                <span className="sr-only">Copy URL</span>
              </Button>
              <span className="flex items-center gap-1">
                <EyeIcon className="h-4 w-4"></EyeIcon>
                {url.views} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
