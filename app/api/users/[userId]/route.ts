import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

type Props = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest, { params }: Props) {
  const userId = params.userId;
  if (!userId || typeof userId !== "string") throw new Error("Invalid ID");

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...user, followersCount }, { status: 200 });
  } catch (err) {
    return NextResponse.json("Failed to fetch user data.", { status: 400 });
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const { name, bio, location, website, coverImage, profileImage } =
    await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        bio,
        location,
        website,
        coverImage,
        profileImage,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to update user.", { status: 500 });
  }
}
