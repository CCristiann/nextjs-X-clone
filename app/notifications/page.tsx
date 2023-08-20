import Header from "@/components/Header";
import NotificationsFeed from "@/components/notifications/NotificationsFeed";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const NotificationsPage = async() => {
  const session = await getServerSession(authOptions)

  if(!session) redirect('/')
  
  return (
    <>
    <Header label="Notifications" showBackArrow />
    <NotificationsFeed session={session} />
    </>
  )
};

export default NotificationsPage;
