"use client";

import React from "react";
import { useSession } from "next-auth/react";

import EditUserModal from "@/components/modals/EditUserModal";
import useUser from "@/hooks/useUser";

const EditUserPage = () => {
  const { data: session } = useSession();
  const { data: user, mutate } = useUser(session?.user.id!);

  if (!user) return null;

  return <EditUserModal user={user} mutateUser={mutate} />;
};

export default EditUserPage;
