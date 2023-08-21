"use client";

import React from "react";
import { useSession } from "next-auth/react";

import Header from "@/components/Header";
import UserHero from "@/components/user/UserHero";
import UserBio from "@/components/user/UserBio";
import TweetsFeed from "@/components/tweets/TweetsFeed";

import useUser from "@/hooks/useUser";

type UserPageProps = {
  params: {
    userId: string;
  };
};
const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const { data: user } = useUser(params.userId);
  const { data: session } = useSession();
  if (!user || !session) return null;

  return (
    <>
      <Header label={user.username} showBackArrow />
      <UserHero
        user={user}
        coverImage={user.coverImage}
        profileImage={user.profileImage}
        dispatch={() => {}}
      />
      <UserBio user={user} session={session} />
      <TweetsFeed user={user} session={session} />
    </>
  );
};

export default UserPage;
