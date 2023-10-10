import React from "react";

import Link from "next/link";

import { IconType } from "react-icons/lib";
import useUser from "@/hooks/useUser";
import { Session } from "next-auth";
import { User } from "@prisma/client";

type SidebarItemProps = {
  label: string;
  href?: string;
  icon: IconType;
  notificationsCount: number;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  notificationsCount,
}) => {
  return (
    <div className="z-50 flex w-fit items-start justify-center lg:justify-start">
      {/*Mobile*/}
      <Link
        className="realtive flex h-fit w-fit cursor-pointer items-center justify-center rounded-full p-3 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden"
        href={href as string}
      >
        {href === "/notifications" ? (
          <div className="relative">
            <Icon size={20} color="white" />
            {notificationsCount > 0 && (
              <div className="absolute -right-[5px] -top-[8px] flex h-5 w-5 items-center justify-center rounded-full bg-twitterBlue p-0.5 text-xs font-bold text-white">
                <span>{notificationsCount}</span>
              </div>
            )}
          </div>
        ) : (
          <Icon size={20} color="white" />
        )}
      </Link>

      {/*Desktop*/}
      <Link
        className="realtive hidden cursor-pointer gap-4 rounded-full p-3 hover:bg-slate-300 hover:bg-opacity-10 lg:flex"
        href={href as string}
      >
        {href === "/notifications" ? (
          <div className="relative">
            <Icon size={23} color="white" />
            {notificationsCount > 0 && (
              <div className="absolute -right-[5px] -top-[8px] flex h-5 w-5 items-center justify-center rounded-full bg-twitterBlue p-0.5 text-xs font-bold text-white">
                <span>{notificationsCount}</span>
              </div>
            )}
          </div>
        ) : (
          <Icon size={23} color="white" />
        )}
        <p className="hidden text-lg text-white lg:block">{label}</p>
      </Link>
    </div>
  );
};

export default SidebarItem;
