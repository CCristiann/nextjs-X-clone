import React from "react";

import Avatar from "../user/Avatar";
import Image from "next/image";

import { PiStarFourFill } from "react-icons/pi";
import { AiFillHeart } from "react-icons/ai";

import axios from "axios";
import { formatDistanceToNow } from "date-fns";

type NotificationProps = {
  notification: Record<string, any>;
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const isMarkedForDeletion = (_createdAt: Date) => {
    const createdAt = new Date(_createdAt).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = Math.abs(currentDate - createdAt);

    const msInADay = 24 * 60 * 60 * 1000;

    const daysDifference = timeDifference / msInADay;

    if (daysDifference > 8) return true;
    return false;
  };

  if (isMarkedForDeletion(notification.createdAt)) {
    axios.delete(
      `/api/notifications/${notification.user.id}/${notification.id}`,
    );
  }

  const createdAt = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="flex h-fit w-full cursor-pointer border-b-[1px] border-neutral-800 py-2 duration-100 hover:bg-slate-400 hover:bg-opacity-5">
      <div className="w-fit px-3 py-2">
        {notification.type === "like" && (
          <AiFillHeart size={30} color="#f43f5e" />
        )}
        {notification.type === "comment" || notification.type === "follow" ? (
          <PiStarFourFill size={30} color="#794BC4" />
        ) : null}
      </div>
      <div className="flex w-full flex-col gap-3 px-3 py-2">
        <div className="flex w-full items-center gap-2">
          <div className="relative h-[32px] w-[32px]">
            <Avatar user={notification.creator} isClickable />
          </div>
          <div className="relative h-[3px] w-[3px]">
            <Image src="/assets/icons/dot.svg" fill alt="Dot" />
          </div>
          <p className="py-3 text-sm text-neutral-500">{createdAt}</p>
        </div>
        <p className="flex flex-wrap gap-x-2.5 break-words text-sm text-neutral-500">
          <span className="break-words font-semibold text-ligthGray">
            {notification.creator.name}
          </span>
          {notification.body}
        </p>
      </div>
    </div>
  );
};

export default Notification;
