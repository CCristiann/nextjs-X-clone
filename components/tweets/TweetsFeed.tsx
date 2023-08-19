"use client";

import useTweets from "@/hooks/useTweets";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import Tweet from "./Tweet";
import { Post, User } from "@prisma/client";
import { Session } from "next-auth";

type TweetsFeedProps = {
  user?: User;
  session?: Session;
};
const TweetsFeed: React.FC<TweetsFeedProps> = ({ user, session }) => {
  const { data: tweets, isLoading } = useTweets(user && user.id);

  if (!session || isLoading)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  return (
    <>
      {tweets.map((tweet: Post) => (
        <Tweet key={tweet.id} tweet={tweet} session={session} />
      ))}
    </>
  );
};

export default TweetsFeed;
