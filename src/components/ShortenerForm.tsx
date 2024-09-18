"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ShortenerForm = () => {
  const [url, setUrl] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(url);
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
        <Button className="w-full p-2">Shorten URL</Button>
      </div>
    </form>
  );
};

export default ShortenerForm;
