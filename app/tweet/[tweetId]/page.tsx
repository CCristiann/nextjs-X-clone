"use client";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Comment from "@/components/tweets/Comment";
import CommentsFeed from "@/components/tweets/CommentsFeed";
import Tweet from "@/components/tweets/Tweet";
import useTweet from "@/hooks/useTweet";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

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
      <div className="w-full h-full">
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
