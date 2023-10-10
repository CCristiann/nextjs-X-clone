import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { TweetValidator } from "@/libs/validators/tweet";

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  const { body, image, creator } = TweetValidator.parse(reqBody);

  try {
    const tweet = await prisma.post.create({
      data: {
        body,
        image,
        creator,
      },
    });

    return NextResponse.json(tweet, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to create tweet", { status: 500 });
  }
}
