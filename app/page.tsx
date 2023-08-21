import React from "react";
import { getServerSession } from "next-auth";

import Header from "@/components/Header";
import Form from "@/components/Form";
import TweetsFeed from "@/components/tweets/TweetsFeed";

import { authOptions } from "@/libs/authOptions";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <>
      <Header label="Home" />
      <Form
        session={session}
        placeholder="What is happening?!"
        buttonLabel="Post"
      />
      <TweetsFeed session={session} />
    </>
  );
};

export default Home;
