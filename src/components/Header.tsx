import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Header = () => {
  return (
    <header className="border-b shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex gap-4 items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">URL Shortener</h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Shorten your URL and share then easily
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/profile-pic.png" alt="Dalpat Rathore" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
