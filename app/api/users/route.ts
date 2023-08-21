import prisma from "@/libs/prismadb";

import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json("Failed to fetch users.", { status: 500 });
  }
}
