'use client'

import { Session } from 'next-auth'
import React from 'react'

import useNotifications from '@/hooks/useNotifications'
import Loader from '../Loader'
import Notification from './Notification'

type NotificationsFeedProps = {
    session: Session
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({
    session
}) => {
  const { data: notifications, isLoading, error } = useNotifications(session.user.id)
 
  if(typeof notifications === 'string') return null
  if(isLoading || !notifications) return (
    <div className='w-full h-full'>
      <Loader />
    </div>
  )

  console.log(notifications)
  if(notifications.length === 0) return (
    <div className='w-full h-fit py-10 flex items-center justify-center'>
      <h3 className='text-xl text-ligthGray font-bold'>You don&apos;t have notifications!</h3>
    </div>
  )
  return (
    <>
    {notifications.map((notification: Record<string, any>) => (
      <>
      {session.user.id === notification.creator.id ? (
        null
      ) : (
        <Notification notification={notification} />
      )}
      </>
    ))}
    </>
  )
}

export default NotificationsFeed