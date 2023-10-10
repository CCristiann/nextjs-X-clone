"use client";

import React from "react";
import { Session } from "next-auth";

import Loader from "../Loader";
import Notification from "./Notification";

import useNotifications from "@/hooks/useNotifications";

type NotificationsFeedProps = {
  session: Session;
};

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({ session }) => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useNotifications(session.user.id);

  if (typeof notifications === "string") return null;
  if (isLoading || !notifications)
    return (
      <div className="h-full w-full">
        <Loader />
      </div>
    );

  if (notifications.length === 0)
    return (
      <div className="flex h-fit w-full items-center justify-center py-10">
        <h3 className="text-xl font-bold text-ligthGray">
          You don&apos;t have notifications!
        </h3>
      </div>
    );
  return (
    <>
      {notifications.map((notification: Record<string, any>) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </>
  );
};

export default NotificationsFeed;
