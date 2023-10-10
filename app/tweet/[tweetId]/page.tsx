"use client";

import React from "react";
import { useSession } from "next-auth/react";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import CommentsFeed from "@/components/tweets/CommentsFeed";
import Tweet from "@/components/tweets/Tweet";

import useTweet from "@/hooks/useTweet";

type PageProps = {
  params: {
    tweetId: string;
  };
};
const TweetPage = ({ params }: PageProps) => {
  const { data: tweet } = useTweet(params.tweetId);
  const { data: session } = useSession();
  if (!tweet || !session)
    return (
      <div className="h-full w-full">
        <Loader />
      </div>
    );

  return (
    <>
      <Header label="Post" showBackArrow />
      <Tweet tweet={tweet} session={session} isForTweetPage />
      <CommentsFeed comments={tweet.comments} />
    </>
  );
};

export default TweetPage;
