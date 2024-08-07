"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Notification as NotificationType } from "@/lib/types";
import { Bell, Notification } from "@phosphor-icons/react";
import { NotificationItem } from "../NotificationItem";

interface Props {
  userNotifications: NotificationType[] | null;
  unreadUserNotificationsCount: number | null;
}

export const NotificationsButton = ({
  userNotifications,
  unreadUserNotificationsCount,
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell
            size={20}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
          {unreadUserNotificationsCount && unreadUserNotificationsCount > 0 ? (
            <div className="absolute top-1 right-2 w-4 h-4 bg-red-600 rounded-full text-xs text-white">
              {unreadUserNotificationsCount}
            </div>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute -right-2 top-2 p-0 w-80">
        <div className="flex justify-between items-center px-4">
          <span className="py-2 text-lg font-semibold">Notifications</span>
        </div>
        <Separator />
        <div className="p-1">
          {userNotifications && userNotifications.length > 0 ? (
            <>
              {/* Loading state */}
              {userNotifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  index={index}
                  notification={notification}
                />
              ))}
            </>
          ) : (
            <div className="h-72 flex flex-col justify-center items-center">
              <Notification
                size={40}
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="mt-2">No notifications</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
