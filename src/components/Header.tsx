import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
const Header = () => {
  return (
    <header className="border-b shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              <Link href={"/"}>URL Shortener</Link>
            </h1>
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
