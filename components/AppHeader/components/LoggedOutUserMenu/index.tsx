"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "@phosphor-icons/react";
import { ThemeToggle } from "../ThemeToggle";
import { useRouter } from "next/navigation";

export const LoggedOutUserMenu = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserCircle
          size={40}
          weight="thin"
          className="cursor-pointer text-ch-dark dark:text-ch-light"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-56" align="end" forceMount>
        <DropdownMenuItem
          className="my-1 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Log in
        </DropdownMenuItem>
        <DropdownMenuItem
          className="my-1 cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </DropdownMenuItem>
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
