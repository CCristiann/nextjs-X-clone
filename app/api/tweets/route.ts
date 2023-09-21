import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export const revalidate = 0;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const tweets = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tweets, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
