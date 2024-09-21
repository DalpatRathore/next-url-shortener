"use client";

import { Button } from "./ui/button";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const TypewriterText = () => {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Next.js",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "|",
    },
    {
      text: "Tailwind",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "|",
    },
    {
      text: "Shadcn",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "...",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center h-44 md:h-[20rem] border rounded-lg shadow">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Button variant={"outline"} size={"lg"} asChild>
          <a
            href="https://www.linkedin.com/in/dalpatrathore/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Now
          </a>
        </Button>
      </div>
    </div>
  );
};

export default TypewriterText;
