import { NextResponse, NextRequest } from "next/server";

import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, username, password, email } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Failed to register user", { status: 500 });
  }
}
