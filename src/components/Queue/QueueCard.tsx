// src/components/QueueCard.tsx
import React from 'react';

import { ClockIcon, TrashIcon, UsersIcon } from '@heroicons/react/solid';
import { Queue } from './interface';
import { useAuth } from '@/components/Provider/AuthContext';
import { Button } from '../Buttons';
import { useRouter } from 'next/router';
interface QueueCardProps {
  queue: Queue;
  isJoined: boolean;
  onJoin: (id:string) => void;
  onLeave: (id:string) => void;
  onDeleteQueue: (id:string) => void;
  tintColor: string;
}

const QueueCard: React.FC<QueueCardProps> = ({ queue, isJoined, onJoin, onLeave, tintColor, onDeleteQueue }) => {
    const progressPercentage = (queue.userCount / queue.queueLength) * 100;
    const {user} = useAuth()
const router =  useRouter();

  return (
    <div style={{borderColor:tintColor}} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border-l-4 ">
      {/* Queue Details */}
      <div className="flex-1 p-4">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-semibold">{queue.eventType}</h2>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between text-gray-600">
            <p>Total people allowed: {queue.queueLength}</p>
            <div className='flex items-center text-gray-600'>
            <UsersIcon className="h-5 w-5 mr-2"/>
            <p>{queue.userCount}</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="absolute top-0 h-2 rounded-full"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: '#1b5e20',
              }}
            />
          </div>
        </div>
        <div className='flex flex-row items-center justify-between'>
        <div className="flex items-center text-gray-600 mt-4">
          <ClockIcon className="h-5 w-5 mr-2" />
          <p>Estimated wait time: {queue.estimatedWaitTime * queue.userCount} min</p>
        </div>
    {user?.role != 'admin'  &&  <div>
        {isJoined ? (
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded rounded-full"
            onClick={() => onLeave(queue.id)}
          >
            Leave Queue
          </button>
        ) : (
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={() => onJoin(queue.id)}
          >
            Join Queue
          </button>
        )}
        </div>}
        {user?.role === 'admin' && 
            <TrashIcon  onClick={() => onDeleteQueue(queue.id)} aria-label='Delete' className='h-5 text-red-600'/>
       }
        </div>
        {/* Estimated Waiting Time */}
     
      </div>

      {/* Action Button */}
      <div className="p-4 bg-gray-50  w-full flex flex-row space-3">
        <div className='w-2/3'>
        <p className='text-sm text-gray-600'>{queue.description}</p>
        </div>
     {user?.role === 'admin' && <div className='w-1/3 text-right'>
      <Button onClick={()=>router.push(`${queue.id}/control`)} size={"fit"} className='text-blue-500' variant={"link"}>Control Queue</Button>
      </div>}
      </div>
    </div>
  );
};

export default QueueCard;
