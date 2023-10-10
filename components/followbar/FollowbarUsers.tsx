"use client";

import React from "react";

import Loader from "../Loader";
import UserWidget from "../user/UserWidget";

import useUsers from "@/hooks/useUsers";

import { User } from "@prisma/client";

const FollowbarUsers = () => {
  const { data: users = [] } = useUsers();
  if (users.length === 0) return <Loader />;

  return (
    <div className="flex h-full flex-col gap-2 overflow-auto px-4 pb-4 pr-5">
      {users.map((user: User) => (
        <UserWidget user={user} key={user.id} isAvatarClickable />
      ))}
    </div>
  );
};

export default FollowbarUsers;
