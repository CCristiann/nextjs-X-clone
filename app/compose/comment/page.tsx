import { authOptions } from "@/libs/authOptions";
import FormModal from "@/components/modals/FormModal";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React from "react";

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
