import { authOptions } from "@/libs/authOptions";
import FormModal from "@/components/modals/FormModal";
import { getServerSession } from "next-auth";
import React from "react";

const ComposeTweetPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <FormModal
      session={session}
      placeholder="What is happening?!"
      buttonLabel="Post"
    />
  );
};

export default ComposeTweetPage;
