"use client";

import { Session } from "next-auth";
import React from "react";
import UserWidget from "../user/UserWidget";
import useUser from "@/hooks/useUser";

type UserProps = {
  session: Session;
};

const User = ({ session }: UserProps) => {
  const { data: user } = useUser(session.user.id);
  if (!user) return null;

  return <UserWidget user={user} hasMenu />;
};

export default User;
