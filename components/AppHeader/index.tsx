"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../app/assets/ChristmasLights-House-Logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { List, MagnifyingGlass } from "@phosphor-icons/react";
import { LoggedOutUserMenu } from "@/components/AppHeader/components/LoggedOutUserMenu";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./components/UserMenu";

interface Props {
  user: User | null;
}

export const AppHeader = ({ user }: Props) => {
  console.log(user);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50 h-16 border-b">
      <nav
        className="flex items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center space-x-5 lg:flex-1">
          <Link href="/" className="">
            <span className="sr-only">Christmas Lights App</span>
            <Image
              src={logo}
              alt="Christmas Lights App"
              width={45}
              height={45}
            />
          </Link>
          {localStorage.getItem("latitude") &&
          localStorage.getItem("longitude") ? (
            <Link
              href="/explore"
              className="hidden text-sm font-semibold leading-6 sm:block hover:underline"
            >
              Explore
            </Link>
          ) : null}
        </div>
        <div className="w-full flex items-center lg:hidden">
          <Input
            type="text"
            placeholder="Search"
            className="mx-3"
            // value={searchQuery ? searchQuery : searchTerm}
            // onChange={(e) => handleSearch(e)}
            // onKeyDown={(e) => searchViaKey(e)}
          />
        </div>
        <div className="lg:hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <List className="w-6 h-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="items-center justify-center hidden w-full max-w-sm mr-10 space-x-2 lg:flex">
          <Input
            type="text"
            placeholder="Search"
            // value={searchQuery ? searchQuery : searchTerm}
            // onChange={(e) => handleSearch(e)}
            // onKeyDown={(e) => searchViaKey(e)}
          />
          <Button
            variant="outline"
            size="icon"
            type="submit"
            // disabled={!searchTerm}
            // onClick={searchViaClick}
          >
            <MagnifyingGlass
              size={16}
              weight="bold"
              className="text-ch-dark dark:text-ch-light"
            />
          </Button>
        </div>
        <div className="hidden lg:flex lg:space-x-5 lg:flex-1 lg:justify-end">
          <Button onClick={() => router.push("/premium")}>Get Premium</Button>
          {user ? <UserMenu /> : <LoggedOutUserMenu />}
        </div>
      </nav>
    </header>
  );
};
