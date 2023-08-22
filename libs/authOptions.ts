import { NextAuthOptions } from "next-auth";

import CredentialProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials.");

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword)
          throw new Error("Invalid credentials.");

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isPasswordValid) throw new Error("Invalid credentials.");

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email!,
        },
      });

      session.user.id = existingUser?.id.toString();
      session.user.image = existingUser?.profileImage;
      session.user.username = existingUser?.username;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
