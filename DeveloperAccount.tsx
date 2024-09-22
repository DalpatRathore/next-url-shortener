import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkedinIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
const DeveloperAccount = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="/dalpatrathore.jpg" alt="Dalpat Rathore" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a
              href="https://www.linkedin.com/in/dalpatrathore/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @dalpatrathore
              <DropdownMenuShortcut>
                <LinkedinIcon className="w-4 h-4"></LinkedinIcon>
              </DropdownMenuShortcut>
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <a
              href="https://github.com/dalpatrathore"
              target="_blank"
              rel="noopener noreferrer"
            >
              @dalpatrathore
              <DropdownMenuShortcut>
                <GitHubLogoIcon className="w-4 h-4"></GitHubLogoIcon>
              </DropdownMenuShortcut>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeveloperAccount;
