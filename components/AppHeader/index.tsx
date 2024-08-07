"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../app/assets/ChristmasLights-House-Logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { LoggedOutUserMenu } from "@/components/AppHeader/components/LoggedOutUserMenu";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./components/UserMenu";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Notification, Profile } from "@/lib/types";
import { CreateButton } from "./components/CreateButton";
import { NotificationsButton } from "./components/NotificationsButton";
import { Dialog, DialogPanel } from "@headlessui/react";
import { getUserNotifications } from "@/api/queries/getUserNotifications";
import { getUserUnreadNotificationsCount } from "@/api/queries/getUnreadNotificationsCount";

interface Props {
  profile: Profile | null;
  user: User | null;
}

export const AppHeader = ({ profile, user }: Props) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentPlace, setCurrentPlace] = useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [userNotifications, setUserNotifications] = useState<
    Notification[] | null
  >(null);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<
    number | null
  >(null);

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
    if (user) {
      const getNotifications = async () => {
        const notifications = await getUserNotifications(user?.id);
        setUserNotifications(notifications);
      };
      const getUnreadNotifications = async () => {
        const unreadUserNotificationsCount =
          await getUserUnreadNotificationsCount(user?.id);
        setUnreadNotificationsCount(unreadUserNotificationsCount);
      };
      getNotifications();
      getUnreadNotifications();
    }
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
              alt="Christmas Lights App logo"
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
        <div className="hidden lg:flex lg:items-center lg:space-x-5 lg:flex-1 lg:justify-end">
          {/* Show premium button if user is not a premium user */}
          {!profile?.has_premium ? (
            <Button onClick={() => router.push("/premium")}>Get Premium</Button>
          ) : null}
          {user ? (
            <>
              <CreateButton setIsCreateOpen={setIsCreateOpen} />
              <NotificationsButton
                userNotifications={userNotifications}
                unreadUserNotificationsCount={unreadNotificationsCount}
              />
              <UserMenu handleSignOut={handleSignOut} user={user} />
            </>
          ) : (
            <LoggedOutUserMenu />
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-background" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto sm:max-w-sm sm:ring-1">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Christmas Lights App</span>
              <Image
                src={logo}
                alt="Christmas Lights App"
                width={45}
                height={45}
              />
            </Link>
            <Button
              variant="ghost"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="w-6 h-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6">
              <div className="py-6 space-y-2">
                <Link
                  href="/"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                >
                  Home
                </Link>
                {localStorage.getItem("latitude") &&
                localStorage.getItem("longitude") ? (
                  <Link
                    href={`/explore?query=${currentPlace}`}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                  >
                    Explore
                  </Link>
                ) : null}
              </div>
              {!user ? (
                <>
                  <Separator />
                  <div className="py-3">
                    <Button
                      variant="link"
                      className="text-foreground -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                      onClick={() => router.push("/login")}
                    >
                      Log in
                    </Button>
                  </div>
                  <Separator />
                </>
              ) : (
                <Separator />
              )}
              {user ? (
                <div className="-mt-2 -mb-6">
                  <div className="py-6 space-y-2">
                    <Link
                      href="/profile"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/notifications"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Notifications
                    </Link>
                    <Link
                      href="/route-planning"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Route Planning
                    </Link>
                    <Link
                      href="/profile/decorations"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Decorations
                    </Link>
                    <Link
                      href="/profile/history"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      History
                    </Link>
                    <Link
                      href="/profile/favourites"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Favourites
                    </Link>
                  </div>
                  <Separator />
                  <div className="w-full py-6">
                    <Button
                      variant="default"
                      className="w-full rounded-full bg-secondary"
                      onClick={handleSignOut}
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              ) : null}
              {!profile?.has_premium ? (
                <div className="w-full py-6">
                  <Button
                    className="w-full rounded-full"
                    onClick={() => router.push("/premium")}
                  >
                    Get Premium
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
