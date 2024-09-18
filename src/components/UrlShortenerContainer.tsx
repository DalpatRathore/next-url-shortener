"use client";
import React, { useState } from "react";
import ShortenerForm from "./ShortenerForm";
import UrlList from "./UrlList";

const UrlShortenerContainer = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUrlShortened = () => {
    setRefreshKey(prev => prev + 1);
  };
  return (
    <div className="space-y-4">
      <ShortenerForm handleUrlShortened={handleUrlShortened}></ShortenerForm>
      <UrlList key={refreshKey}></UrlList>
    </div>
  );
};

export default UrlShortenerContainer;
