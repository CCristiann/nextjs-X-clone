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
  notificationsCount
}) => {

  return (
    <div className="flex items-start justify-center lg:justify-start w-fit z-50">
      {/*Mobile*/}
      <Link
        className="realtive rounded-full h-fit w-fit flex items-center justify-center p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"
        href={href as string}
      >

        {href === '/notifications' ? (
          <div className="relative">
            <Icon size={20} color="white" />
            {notificationsCount > 0 && (
              <div className="w-5 h-5 absolute -right-[5px] -top-[8px] text-white bg-twitterBlue rounded-full p-0.5 text-xs font-bold flex items-center justify-center">
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
        className="realtive rounded-full gap-4 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer hidden lg:flex"
        href={href as string}
      >
        {href === '/notifications' ? (
          <div className="relative">
            <Icon size={23} color="white" />
            {notificationsCount > 0 && (
              <div className="w-5 h-5 absolute -right-[5px] -top-[8px] text-white bg-twitterBlue rounded-full p-0.5 text-xs font-bold flex items-center justify-center">
                <span>{notificationsCount}</span>
              </div>
            )}
          </div>
        ) : (
          <Icon size={23} color="white" />
        )}
        <p className="hidden lg:block text-white text-lg">{label}</p>
      </Link>
    </div>
  );
};

export default SidebarItem;
