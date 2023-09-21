import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { CommentValidator } from "@/libs/validators/comment";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { body, image, tweetId, creator } = CommentValidator.parse(reqBody);

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

      if (tweet?.creator) {
        if (creator !== tweet?.creator) {
          await prisma.notification.create({
            data: {
              type: "comment",
              body: "commented your tweet.",
              creatorId: creator,
              userId: tweet?.creator,
            },
          });
        }
      }

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
