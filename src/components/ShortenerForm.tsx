"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Copy, ExternalLink, Link, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { formatShortenedUrl } from "@/lib/format-shortened-url";

const urlSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

const ShortenerForm = () => {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: shortenedUrl || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof urlSchema>) => {
    try {
      const response = await fetch("/api/short-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: values.url }),
      });
      const result = await response.json();
      setOriginalUrl(result.originalUrl);
      setShortenedUrl(result.shortenedUrl);
    } catch (error) {
      console.log(error);
    }
  };

  // Copy shortened URL to clipboard
  const handleCopy = async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl);
        alert("URL copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy the URL", error);
      }
    }
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl md:text-2xl">
            Create Shortened URL
          </CardTitle>
          <CardDescription className="max-w-80 mx-auto">
            Copy the short link and share it in messages, texts, posts, websites
            and other locations.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-8"></Separator>
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
                  <FormItem className="">
                    <div className="flex items-center justify-center">
                      <Link className="w-6 h-6 md:w-8 md:h-8 mr-2"></Link>
                      <FormControl>
                        {/* If a shortened URL exists, replace input value with it */}
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          value={
                            (shortenedUrl &&
                              formatShortenedUrl(shortenedUrl)) ||
                            field.value
                          } // Display shortened URL if available
                          readOnly={!!shortenedUrl} // Make it read-only when shortened URL is present
                        />
                      </FormControl>
                      {shortenedUrl && (
                        <Button
                          type="button"
                          variant={"outline"}
                          // size={"icon"}
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
                <p className="text-xs md:text-sm font-bold">
                  Original URL:{" "}
                  <Button
                    variant={"link"}
                    asChild
                    className="px-0 text-blue-600"
                  >
                    <a
                      href={originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {originalUrl}
                    </a>
                  </Button>
                </p>
              )}
              {shortenedUrl && originalUrl ? (
                <Button
                  type="button"
                  className="w-full"
                  size={"lg"}
                  variant={"outline"}
                  onClick={() => window.location.reload()}
                >
                  Shorten Another URL{" "}
                  <RefreshCcw className="w-4 h-4 ml-2"></RefreshCcw>
                </Button>
              ) : (
                <Button type="submit" className="w-full" size={"lg"}>
                  Shorten URL{" "}
                  <ExternalLink className="w-4 h-4 ml-2"></ExternalLink>
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ShortenerForm;
