import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

type Props = {
  params: {
    tweetId: string;
  };
};

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const tweet = await prisma.post.findUnique({
      where: {
        id: params.tweetId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(tweet, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to fetch tweet", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  if (!params.tweetId) throw new Error("No tweet ID");
  try {
    const deleteTweet = await prisma.post.findUnique({
      where: {
        id: params.tweetId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!deleteTweet) throw new Error("Tweet not found");

    await prisma.post.delete({
      where: {
        id: deleteTweet.id,
      },
    });

    const updatedComments = await prisma.comment.updateMany({
      where: {
        tweetId: deleteTweet.id,
      },
      data: {
        isTweetDeleted: true,
      },
    });

    return NextResponse.json(updatedComments, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to delete tweet", { status: 500 });
  }
}
