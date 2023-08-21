import React from "react";

import RegisterModal from "@/components/modals/RegisterModal";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <RegisterModal />;
};

export default RegisterPage;
