import { Notification } from "@/lib/types";
import { NotificationOptionsMenu } from "../NotificationOptionsMenu";
import { getRelativeTimeString } from "@/lib/helpers";
import { CircleNotch } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface Props {
  markSingleNotification: (notificationId: string, unread: boolean) => void;
  notification: Notification;
}

export const NotificationItem = ({
  markSingleNotification,
  notification,
}: Props) => {
  return (
    <div className="flex flex-col text-sm py-2 mx-2 my-2 px-2 rounded-xl cursor-default hover:bg-muted">
      <div className="flex justify-between items-center">
        <span className="font-bold">{notification.title}</span>
        <NotificationOptionsMenu
          notification={notification}
          markSingleNotification={markSingleNotification}
          // deleteSingleNotification={deleteSingleNotification}
        />
      </div>
      <span className="text-left text-xs pb-3">{notification.body}</span>
      <div className="flex justify-between items-center text-xs mt-1">
        {notification.unread ? (
          <span className="py-1 px-2 bg-red-200 text-red-600 font-semibold rounded-full">
            unread
          </span>
        ) : (
          <span className="py-1 px-2 bg-green-200 text-green-600 font-semibold rounded-full">
            read
          </span>
        )}
        <span>{getRelativeTimeString(new Date(notification.created_at))}</span>
      </div>
    </div>
  );
};
