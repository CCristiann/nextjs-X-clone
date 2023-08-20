import React from 'react'

import Image from 'next/image'
import { PiStarFourFill } from 'react-icons/pi'
import Avatar from '../user/Avatar'
import { AiFillHeart } from 'react-icons/ai'

type NotificationProps = {
    notification: Record<string, any>
}

const Notification: React.FC<NotificationProps> = ({
    notification
}) => {
  console.log(notification)

  return (
    <div className='flex w-full h-fit py-2 border-b-[1px] border-neutral-800 hover:bg-slate-400 hover:bg-opacity-5 duration-100 cursor-pointer'>
        <div className='w-fit px-3 py-2'>
            {notification.type === 'like' && (
                <AiFillHeart size={30} color='#f43f5e' />
            )}
            {notification.type === 'comment' || notification.type === 'follow' ? (
                <PiStarFourFill size={30} color='#794BC4' />
            ) : (
                null
            )}
        </div>
        <div className='w-full flex flex-col gap-3 px-3 py-2'>
            <div className='relative w-[32px] h-[32px]'>
              <Avatar user={notification.creator} isClickable />
            </div>
            <p className='text-base text-neutral-500 flex gap-2.5'>
                <span className='font-semibold text-ligthGray'>
                    {notification.creator.name}
                </span>
                {notification.body}
            </p>
        </div>
    </div>
  )
}

export default Notification