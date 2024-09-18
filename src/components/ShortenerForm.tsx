"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ShortenerFormProps {
  handleUrlShortened: () => void;
}

const ShortenerForm = ({ handleUrlShortened }: ShortenerFormProps) => {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });
      await response.json();
      setUrl("");
      handleUrlShortened();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          className="h-12"
          type="url"
          placeholder="Enter URL to shorten"
          required
          value={url}
          onChange={e => setUrl(e.target.value)}
        ></Input>
        <Button className="w-full p-2" disabled={isLoading}>
          Shorten URL
        </Button>
      </div>
    </form>
  );
};

export default ShortenerForm;
