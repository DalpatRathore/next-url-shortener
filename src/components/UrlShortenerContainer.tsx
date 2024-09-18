import React from "react";
import ShortenerForm from "./ShortenerForm";
import UrlList from "./UrlList";

const UrlShortenerContainer = () => {
  return (
    <div className="space-y-4">
      <ShortenerForm></ShortenerForm>
      <UrlList></UrlList>
    </div>
  );
};

export default UrlShortenerContainer;
