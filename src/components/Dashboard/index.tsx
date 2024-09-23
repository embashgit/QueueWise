import React, { useEffect, useState } from 'react';
import QueueCard from '@/components/Queue/QueueCard';
import { useAuth } from '@/Provider/AuthContext';
import { generateRandomColor } from '../../../utils/randomColor';
import { Queue } from '../Queue/interface';
import GenericInput from '../Form/Input';
import { findQueue } from '../../../utils/helpers/queueFinder';
import AnimationWrapper from '../Animations/FlyInWrapper';

const Dashboard: React.FC = () => {
    const [queuesWithColor, setQueuesWithColor] = useState<(Queue & { tintColor: string })[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
    const { fetchQueues,joinQueue,joinedQueues,leaveQueue, queues } = useAuth();

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

    const handleJoinQueue = async(id: string) => {
        if (!findQueue(joinedQueues,id)) {
          await joinQueue(id);
        }
    };

    const handleLeaveQueue = async(id: string) => {
      if (findQueue(joinedQueues,id)) {
        await leaveQueue(id);
      }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); // Update search query state
    };

    const filteredQueues = queuesWithColor.filter((queue) =>
        queue.eventType.toLowerCase().includes(searchQuery.toLowerCase()) // Filter queues based on the search query
    );
    return (
        <div>
            {/* Search Bar to search available queue here */}
            <div className='mt-6'>
                <GenericInput
                    label='Search Queue'
                    iconName='search'
                    color={"gray-trusted"}
                    name='search'
                    containerClassName='rounded rounded-full py-3'
                    placeholder='Search Queue'
                    value={searchQuery}
                    handleChange={handleSearchChange} // Handle search input change
                />
            </div>
            <h2 className="text-xl my-3 font-semibold">Available Queues</h2>
            <AnimationWrapper>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredQueues.length > 0 ? filteredQueues.map(({ tintColor, ...rest }) => (
                    <QueueCard
                        key={rest.id}
                        queue={rest}
                        isJoined={findQueue(joinedQueues, rest.id)}
                        onJoin={handleJoinQueue}
                        onLeave={handleLeaveQueue}
                        tintColor={tintColor}
                    />
                )) : (<div>No Queue Available</div>)}
            </div>
            </AnimationWrapper>

            {/* <h2 className="text-xl font-semibold mt-8 mb-4">Joined Queues</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredQueues.length > 0 ? filteredQueues
                    .filter((queue) => joinedQueues.includes(queue.id))
                    .map((queue) => (
                        <QueueCard
                            queue={queue}
                            key={queue.id}
                            isJoined={joinedQueues.includes(queue.id)}
                            onJoin={handleJoinQueue}
                            onLeave={handleLeaveQueue}
                            tintColor={queue?.tintColor}
                        />
                    )) : <div></div>}
                {joinedQueues.length === 0 && (
                    <p className="text-gray-500">You have not joined any queues yet.</p>
                )}
            </div> */}
        </div>
    );
};

export default Dashboard;
