import { NextRequest, NextResponse } from "next/server";

import prisma from '@/libs/prismadb'

type Props = {
    params: {
        userId: string
    }
}
export async function GET(req: NextRequest, { params } : Props){
    try{
        const notifications = await prisma.notification.findMany({
            where: {
                userId: params.userId
            },
            include: {
                user: true,
                creator: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(notifications, { status: 200 })
    }catch(err){
        console.log(err)
        return NextResponse.json('Failed to fetch user notifications', { status: 500 })
    }
}