// src/components/QueueCard.tsx
import React from 'react';

import { ClockIcon } from '@heroicons/react/solid';
import { Queue } from './interface';

interface QueueCardProps {
  queue: Queue;
  isJoined: boolean;
  onJoin: (id:string) => void;
  onLeave: (id:string) => void;
  tintColor: string;
}

const QueueCard: React.FC<QueueCardProps> = ({ queue, isJoined, onJoin, onLeave, tintColor }) => {
    const progressPercentage = (queue.userCount / queue.queueLength) * 100;

  return (
    <div style={{borderColor:tintColor}} className="flex flex-col bg-white shadow rounded-lg overflow-hidden border-l-4">
      {/* Queue Details */}
      <div className="flex-1 p-4">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-semibold">{queue.eventType}</h2>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between text-gray-600">
            <p>Total people allowed: {queue.queueLength}</p>
            <p>Waiting people: {queue.userCount}</p>
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
          <p>Estimated wait time: {queue.estimatedWaitTime * queue.userCount}</p>
        </div>
        <div>
        {isJoined ? (
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded"
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
        </div>
        </div>
        {/* Estimated Waiting Time */}
     
      </div>

      {/* Action Button */}
      <div className="p-4 bg-gray-50">
        <p className='text-sm text-gray-600'>{queue.description}</p>
      </div>
    </div>
  );
};

export default QueueCard;
