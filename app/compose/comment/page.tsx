import React from "react";

import { getServerSession } from "next-auth";

import FormModal from "@/components/modals/FormModal";

import { authOptions } from "@/libs/authOptions";

const ComposeCommentPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <FormModal
      session={session}
      placeholder="Post your reply"
      buttonLabel="Reply"
    />
  );
};

export default ComposeCommentPage;
