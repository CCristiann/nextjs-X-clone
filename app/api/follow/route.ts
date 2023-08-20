import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { userId, currentUserId } = await req.json();

    if (!userId && !currentUserId) {
      throw new Error("Invalid user ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("Invalid user ID");

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds.push(userId);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    await prisma.notification.create({
      data: {
        type: 'follow',
        body: 'started following you.',
        creatorId: currentUserId,
        userId: userId
      }
    })

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to follow user", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, currentUserId } = await req.json();

    if (!userId && !currentUserId) {
      throw new Error("Invalid user ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("Invalid user ID");

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userId,
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to follow user", { status: 500 });
  }
}
