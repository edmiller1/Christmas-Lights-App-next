"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import logo from "../../app/assets/ChristmasLights-House-Logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { List, MagnifyingGlass } from "@phosphor-icons/react";
import { LoggedOutUserMenu } from "@/components/AppHeader/components/LoggedOutUserMenu";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./components/UserMenu";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Profile } from "@/lib/types";

interface Props {
  profile: Profile | null;
  user: User | null;
}

export const AppHeader = ({ profile, user }: Props) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentPlace, setCurrentPlace] = useState<string>("");

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("You have been signed out successfully");
      router.push("/");
    }
  };

  const getCoords = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem(
          "latitude",
          JSON.stringify(position.coords.latitude)
        );
        localStorage.setItem(
          "longitude",
          JSON.stringify(position.coords.longitude)
        );
      });

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${localStorage.getItem(
          "longitude"
        )},${localStorage.getItem("latitude")}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_API_KEY
        }`
      );
      const jsonData = await response.json();
      const place = jsonData.features.find((item: any) =>
        item.id.includes("place")
      );
      setCurrentPlace(place.text);
    } else {
      return;
    }
  };

  useEffect(() => {
    getCoords();
  }, []);

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
          {typeof window !== undefined &&
          window?.localStorage.getItem("latitude") &&
          window?.localStorage.getItem("longitude") ? (
            <Link
              href={`/explore?place=${currentPlace}`}
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
          {/* Show premium button if user is not a premium user */}
          {!profile?.has_premium ? (
            <Button onClick={() => router.push("/premium")}>Get Premium</Button>
          ) : null}
          {user ? (
            <UserMenu handleSignOut={handleSignOut} user={user} />
          ) : (
            <LoggedOutUserMenu />
          )}
        </div>
      </nav>
    </header>
  );
};
