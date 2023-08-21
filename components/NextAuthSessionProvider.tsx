"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: ReactNode;
};
const NextAuthSessionProvider: React.FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;
