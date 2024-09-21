"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import {
  Copy,
  ExternalLink,
  FileSliders,
  LinkIcon,
  LoaderCircle,
  Share2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import UrlsList from "./UrlsList";
import { formatShortenedUrl } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import SocialMedia from "./SocialMedia";
import SkeletonLoading from "./SkeletonLoading";
import toast from "react-hot-toast";
import TypewriterText from "./TypewriterText";

interface IUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  views: number;
}

const urlSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

const ShortenerForm = () => {
  const [urls, setUrls] = useState<IUrl[]>([]);
  const [loading, setLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });

  const fetchUrls = useCallback(async () => {
    try {
      const res = await fetch("/api/get-urls");
      const data = await res.json();
      setUrls(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch URLs", error);
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof urlSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: values.url }),
      });
      const result = await response.json();
      if (result) {
        setOriginalUrl(result.originalUrl);
        setShortenedUrl(result.shortCode);
        toast.success("URL successfully shortened!");
      }
      await fetchUrls();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Copy shortened URL to clipboard
  const handleCopy = useCallback(async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(formatShortenedUrl(shortenedUrl));
        toast.success("URL copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy the URL", error);
      }
    }
  }, [shortenedUrl]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
      <div className="w-full flex flex-col items-center jusitfy-center gap-5">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-xl md:text-2xl">
              Create Shortened URL
            </CardTitle>
            <CardDescription>
              Shorten your URL and share them easily
            </CardDescription>
          </CardHeader>
          <Separator className="mb-5" />
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-center">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        <FormControl>
                          <Input
                            placeholder="https://example.com"
                            {...field}
                            className={cn(
                              shortenedUrl && "text-blue-600 font-bold"
                            )}
                            value={
                              (shortenedUrl &&
                                formatShortenedUrl(shortenedUrl)) ||
                              field.value
                            }
                            readOnly={!!shortenedUrl}
                            aria-label="Shortened URL input"
                          />
                        </FormControl>
                        {shortenedUrl && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCopy}
                            className="ml-2"
                            title="Copy URL"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="sr-only">Copy</span>
                          </Button>
                        )}
                      </div>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
                {originalUrl && (
                  <div className="group relative">
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 transition-all duration-200 flex items-center justify-start gap-2">
                      <FileSliders className="w-4 h-4"></FileSliders>{" "}
                      {originalUrl}
                    </p>
                    <span className="absolute left-6 top-full mt-1 hidden group-hover:inline-block bg-gray-800 dark:bg-gray-100 text-white dark:text-black text-xs px-2 py-1 rounded">
                      {originalUrl}
                    </span>
                  </div>
                )}
                {shortenedUrl ? (
                  <Button
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="secondary"
                    onClick={() => {
                      setShortenedUrl(null);
                      setOriginalUrl(null);
                      form.reset();
                    }}
                  >
                    Shorten Another URL{" "}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        Processing
                        <LoaderCircle className="w-4 h-4 ml-2 animate-spin" />
                      </>
                    ) : (
                      <>
                        Shorten URL <ExternalLink className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
        <TypewriterText></TypewriterText>
      </div>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl md:text-2xl">
            Recently Shortened URLs
          </CardTitle>
          <CardDescription>
            App stores only the
            <strong className="mx-1">3</strong>
            most recent shortened URL entries.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-5" />
        <CardContent className="grid gap-4">
          {urls.length === 0 ? (
            <SkeletonLoading></SkeletonLoading>
          ) : (
            <ul>
              {urls.map(url => (
                <UrlsList key={url.id} url={url} />
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center space-x-4 rounded-md border p-4">
            <Share2 className="w-3 h-3 md:w-5 md:h-5 shrink-0" />
            <div className="flex-1 flex items-center justify-evenly">
              <SocialMedia></SocialMedia>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShortenerForm;
