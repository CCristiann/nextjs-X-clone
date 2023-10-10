import React from "react";

import { Session } from "next-auth";

import SidebarItem from "./SidebarItem";
import TweetBtn from "./TweetBtn";
import TwitterX from "../TwitterX";
import User from "./User";

import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser, FaSearch } from "react-icons/fa";
import useUser from "@/hooks/useUser";

import prisma from "@/libs/prismadb";

type SidebarProps = {
  session: Session;
};

const Sidebar: React.FC<SidebarProps> = async ({ session }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const notificationsCount = await prisma.notification.count({
    where: {
      userId: user?.id,
    },
  });

  const sidebarLinks = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Explore",
      href: "/",
      icon: FaSearch,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: `/user/${session.user.id}`,
      icon: FaUser,
    },
  ];

  if (!user) return null;

  return (
    <div className="paddings fixed bottom-0 z-50 flex w-screen justify-center border-t-[1px] border-neutral-800 bg-black md:sticky md:top-0 md:max-h-screen md:w-fit md:flex-col md:items-center md:justify-between">
      <div className="flex w-full flex-col gap-5">
        <div className="hidden w-fit justify-start rounded-full p-4 duration-100 hover:bg-slate-400 hover:bg-opacity-10 md:flex">
          <TwitterX size="xs" color="lightGray" />
        </div>
        <div className="flex w-full flex-row justify-around gap-2.5 md:flex-col md:items-center lg:items-start">
          {sidebarLinks.map((link, i: number) => (
            <SidebarItem
              key={i}
              label={link.label}
              href={link.href}
              icon={link.icon}
              notificationsCount={notificationsCount}
            />
          ))}
          <TweetBtn />
        </div>
      </div>

      <User session={session} />
    </div>
  );
};

export default Sidebar;
