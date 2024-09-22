import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import DeveloperAccount from "../../DeveloperAccount";

const Header = () => {
  return (
    <header className="border-b shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 py-5">
        <div className="w-full flex gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-800 via-yellow-500 to-indigo-800 inline-block text-transparent bg-clip-text capitalize">
              <Link href={"/"}>URL Shortener</Link>
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <DeveloperAccount></DeveloperAccount>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
