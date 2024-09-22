

// src/pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import QueueCard from '@/components/Queue/QueueCard';
import { useAuth } from '@/Provider/AuthContext';
import { generateRandomColor } from '../../../utils/randomColor';
import { Queue } from '../Queue/interface';
import GenericInput from '../Form/Input';

const Dashboard: React.FC = () => {
    const [joinedQueues, setJoinedQueues] = useState<string[]>([]);
    const [queuesWithColor, setQueuesWithColor] = useState<(Queue & { tintColor: string })[]>([]);
  const { fetchQueues, queues } = useAuth();

  useEffect(() => {
    fetchQueues();  // Fetch queues when the component mounts
  }, []);

  useEffect(() => {
    if (queues.length > 0) {
      const queuesWithColors = queues.map((queue) => ({
        ...queue,
        tintColor: generateRandomColor(),
      }));
      setQueuesWithColor(queuesWithColors);
    }
  }, [queues]);


  const handleJoinQueue = (id: string) => {
    if (!joinedQueues.includes(id)) {
      setJoinedQueues([...joinedQueues, id]);
    }
  };

  const handleLeaveQueue = (id: string) => {
    setJoinedQueues(joinedQueues.filter((queueId) => queueId !== id));
  };

  return (
    <div>
      {/* Search Bar to search available queue here */}
      <div className='mt-6'>
        <GenericInput label='Search Queue' iconName='search' color={"gray-trusted"} name='search' containerClassName='rounded rounded-full py-3' placeholder='Searh Queue' />
      </div>
      <h2 className="text-xl my-3 font-semibold">Available Queues</h2>
      <div className="space-y-4">
        {queuesWithColor.length > 0 ? queuesWithColor.map(({tintColor, ...rest} ) => (
          <QueueCard
                key={rest.id}
               queue={rest}
                isJoined={joinedQueues.includes(rest.id)}
                onJoin={handleJoinQueue}
                onLeave={handleLeaveQueue}
                tintColor={tintColor}          />
        )): (<div> No Queue Available</div>)}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Joined Queues</h2>
      <div className="space-y-4">
        {queuesWithColor.length > 0 ? queuesWithColor
          .filter((queue) => joinedQueues.includes(queue.id))
          .map((queue) => (
            <QueueCard
           queue={queue}
           key={queue.id}
            isJoined={joinedQueues.includes(queue.id)}
            onJoin={handleJoinQueue}
            onLeave={handleLeaveQueue}
            tintColor={queue?.tintColor}            />
          )) : <div></div>}
        {joinedQueues.length === 0 && (
          <p className="text-gray-500">You have not joined any queues yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
