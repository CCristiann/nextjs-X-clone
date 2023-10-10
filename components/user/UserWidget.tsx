"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Avatar from "./Avatar";
import Menu from "../menu/Menu";
import MenuItem from "../menu/MenuItem";

import { BsThreeDots } from "react-icons/bs";

import { User } from "@prisma/client";

type UserWidgetProps = {
  user?: User;
  hasMenu?: boolean;
  menuOptions?: {
    label?: string;
    onClick?: () => void;
  };
  isAvatarClickable?: boolean;
};
const UserWidget: React.FC<UserWidgetProps> = ({
  user,
  hasMenu,
  menuOptions,
  isAvatarClickable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={handleClick}
      className="relative hidden w-fit cursor-pointer items-center rounded-full p-2.5 duration-150 hover:bg-slate-300 hover:bg-opacity-10 md:flex lg:w-full"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-[40px] w-[40px]">
            {isAvatarClickable ? (
              <Avatar user={user} isClickable />
            ) : (
              <Avatar user={user} />
            )}
          </div>
          <div className="hidden flex-col lg:flex">
            <h4 className="text-sm font-semibold text-ligthGray">
              {user.name && (
                <>
                  {user.name.length > 10
                    ? `${user.name.slice(0, 10)}...`
                    : user.name}
                </>
              )}
            </h4>
            <p className="text-sm text-neutral-500">@{user.username}</p>
          </div>
        </div>
        {hasMenu && (
          <div className="lg:mr-2">
            <BsThreeDots
              size={19}
              color="lightGray"
              className="hidden lg:block"
            />
            <Menu
              setIsOpen={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
              userWidget
            >
              <MenuItem
                label="Add an existing account"
                color="lightGray"
                onClick={() => {}}
              />
              <MenuItem
                label={`Log out @${user.username}`}
                color="lightGray"
                onClick={() => router.push("/logout")}
              />
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWidget;
