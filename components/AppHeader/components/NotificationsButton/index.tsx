"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Notification as NotificationType } from "@/lib/types";
import { Bell, CircleNotch, Notification } from "@phosphor-icons/react";
import { NotificationItem } from "../NotificationItem";
import { AllNotificationsMenu } from "../AllNotificationsMenu";

interface Props {
  markNotificationsAsRead: () => void;
  markNotificationsAsReadLoading: boolean;
  markSingleNotification: (notificationId: string, unread: boolean) => void;
  markSingleNotificationLoading: boolean;
  notifications: NotificationType[] | null | undefined;
}

export const NotificationsButton = ({
  markNotificationsAsRead,
  markNotificationsAsReadLoading,
  markSingleNotification,
  markSingleNotificationLoading,
  notifications,
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
          {notifications &&
          notifications?.filter((notifications) => notifications.unread)
            .length > 0 ? (
            <div className="absolute top-1 right-2 w-4 h-4 bg-red-600 rounded-full text-xs text-white">
              {
                notifications?.filter((notifications) => notifications.unread)
                  .length
              }
            </div>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute -right-2 top-2 p-0 w-80">
        <div className="flex justify-between items-center px-4">
          <span className="py-2 text-lg font-semibold">Notifications</span>
          {notifications && notifications.length > 0 ? (
            <AllNotificationsMenu
              markNotificationsAsRead={markNotificationsAsRead}
            />
          ) : null}
        </div>
        <Separator />
        <div className="p-1">
          {notifications && notifications.length > 0 ? (
            <>
              {markNotificationsAsReadLoading ||
              markSingleNotificationLoading ? (
                <div className="h-52 flex justify-center items-center">
                  <CircleNotch
                    size={64}
                    className="text-ch-dark dark:text-ch-light animate-spin"
                  />
                </div>
              ) : (
                <>
                  {notifications.map((notification, index) => (
                    <>
                      <NotificationItem
                        key={index}
                        markSingleNotification={markSingleNotification}
                        notification={notification}
                      />
                      <Separator />
                    </>
                  ))}
                </>
              )}
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
