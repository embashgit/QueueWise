import React, { useEffect, useState } from 'react';
import QueueCard from '@/components/Queue/QueueCard';
import { useAuth } from '@/components/Provider/AuthContext';
import { generateRandomColor } from '../../../utils/randomColor';
import { Queue } from '@/components/Queue/interface';
import GenericInput from '../Form/Input';
import { findQueue } from '../../../utils/helpers/queueFinder';
import AnimationWrapper from '@/components/Animations/FlyInWrapper';

import { useBreadcrumb } from '@/components/Provider/BreadCrumbContext';
import { useRouter } from 'next/router';
const Dashboard: React.FC = () => {
  const location = useRouter();
  const { addBreadcrumb } = useBreadcrumb();
    const [queuesWithColor, setQueuesWithColor] = useState<(Queue & { tintColor: string })[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
    const { fetchQueues,joinQueue,joinedQueues,leaveQueue,removeQueue, queues } = useAuth();

    useEffect(() => {
        fetchQueues();  // Fetch queues when the component mounts
    }, []);

    useEffect(() => {
      return addBreadcrumb('Home');
  }, [location.pathname, addBreadcrumb, location.asPath]);

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
          joinQueue(id);
        }
    };
    const handleDeleteQueue = async(id: string) => {
        removeQueue(id);
    }

    const handleLeaveQueue = async(id: string) => {
      if (findQueue(joinedQueues,id)) {
        leaveQueue(id);
      }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                        onDeleteQueue={handleDeleteQueue}
                    />
                )) : (<div>No Queue Available</div>)}
            </div>
            </AnimationWrapper>
        </div>
    );
};

export default Dashboard;
