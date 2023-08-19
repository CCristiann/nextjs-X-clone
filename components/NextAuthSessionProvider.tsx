"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
const NextAuthSessionProvider: React.FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;
