import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest, res: NextResponse) {
  const { body, image, creator } = await req.json();

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
