import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

type Props = {
  params: {
    notificationId: string;
  };
};

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    if (params.notificationId) {
      await prisma.notification.delete({
        where: {
          id: params.notificationId,
        },
      });
    }

    return NextResponse.json("OK", { status: 200 });
  } catch (err) {
    return NextResponse.json("Failed to delete notification", { status: 500 });
  }
}
