import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

type Props = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest, { params }: Props) {
  try {
    const userTweets = await prisma.post.findMany({
      where: {
        creator: params.userId,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(userTweets, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to fetch user tweets", { status: 500 });
  }
}
