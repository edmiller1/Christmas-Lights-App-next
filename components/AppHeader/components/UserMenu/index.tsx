"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";

export const UserMenu = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 mt-1 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Sunny Dog</p>
              <p className="text-xs leading-none text-muted-foreground">
                sunnydog@gmail.com
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/route-planning")}
          >
            Route Planning
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/profile/decorations")}
          >
            Decorations
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/profile/history")}
          >
            History
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/profile/favourites")}
          >
            Favourites
          </DropdownMenuItem>
          <ThemeToggle />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
