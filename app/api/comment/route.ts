import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { body, image, tweetId, creator } = await req.json();

    if (!tweetId) throw new Error("Invalid tweet ID");

    const comment = await prisma.comment.create({
      data: {
        body,
        image,
        creator,
        tweetId,
      },
    });

    try {
      const tweet = await prisma.post.findUnique({
        where: {
          id: tweetId,
        },
      });

      await prisma.user.update({
        where: {
          id: tweet?.creator,
        },
        data: {
          hadNotifications: true,
        },
      });
    } catch (err) {
      console.log(err);
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to create comment", { status: 500 });
  }
}
