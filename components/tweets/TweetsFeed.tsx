"use client";

import React from "react";

import { Session } from "next-auth";

import Loader from "../Loader";
import Tweet from "./Tweet";

import useTweets from "@/hooks/useTweets";

import { Post, User } from "@prisma/client";

type TweetsFeedProps = {
  user?: User;
  session?: Session;
};
const TweetsFeed: React.FC<TweetsFeedProps> = ({ user, session }) => {
  const { data: tweets, isLoading } = useTweets(user && user.id);

  if (!session || isLoading)
    return (
      <div className="h-full w-full">
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
