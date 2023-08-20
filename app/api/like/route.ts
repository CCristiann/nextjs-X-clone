import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { tweetId, userId } = await req.json();

    if (!tweetId) throw new Error("Invalid tweet ID");

    const post = await prisma.post.findUnique({
      where: {
        id: tweetId,
      },
    });

    if (!post) throw new Error("Invalid tweet ID");

    let updatedLikeIds = [...(post.likeIds || [])];

    updatedLikeIds.push(userId);

    const updatedPost = await prisma.post.update({
      where: {
        id: tweetId,
      },
      data: {
        likeIds: updatedLikeIds,
      },
    });

    await prisma.notification.create({
      data: {
        type: 'like',
        body: 'liked your tweet.',
        creatorId: userId,
        userId: updatedPost.creator
      }
    })

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to update the tweet", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { tweetId, userId } = await req.json();

    if (!tweetId) throw new Error("Invalid tweet ID");

    const post = await prisma.post.findUnique({
      where: {
        id: tweetId,
      },
    });

    if (!post) throw new Error("Invalid tweet ID");

    let updatedLikeIds = [...(post.likeIds || [])];

    updatedLikeIds = updatedLikeIds.filter((likeId) => likeId !== userId);

    const updatedPost = await prisma.post.update({
      where: {
        id: tweetId,
      },
      data: {
        likeIds: updatedLikeIds,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to update the tweet", { status: 500 });
  }
}
