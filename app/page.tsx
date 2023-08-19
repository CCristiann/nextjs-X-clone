import React, { useEffect } from "react";

import Header from "@/components/Header";
import LoginModal from "@/components/modals/LoginModal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import Loader from "@/components/Loader";
import Form from "@/components/Form";
import TweetsFeed from "@/components/tweets/TweetsFeed";

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
