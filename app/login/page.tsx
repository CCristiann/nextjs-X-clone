import LoginModal from "@/components/modals/LoginModal";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <LoginModal />;
};

export default LoginPage;
