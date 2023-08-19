"use client";

import EditUserModal from "@/components/modals/EditUserModal";
import useUser from "@/hooks/useUser";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const EditUserPage = () => {
  const { data: session } = useSession();
  const { data: user } = useUser(session?.user.id!);

  if (!user) return null;

  return <EditUserModal user={user} />;
};

export default EditUserPage;
