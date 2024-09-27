import React, { useEffect, useState } from 'react';
import QueueCard from '@/components/Queue/QueueCard';
import { useAuth } from '@/components/Provider/AuthContext';
import { generateRandomColor } from '../../../utils/randomColor';
import { Queue } from '../Queue/interface';
import GenericInput from '../Form/Input';
import { findQueue } from '../../../utils/helpers/queueFinder';
import AnimationWrapper from '../Animations/FlyInWrapper';
import { useBreadcrumb } from '@/components/Provider/BreadCrumbContext';
import { useRouter } from 'next/router';

const JoinedQueue: React.FC = () => {
    const router = useRouter()
    const { addBreadcrumb } = useBreadcrumb();
    const [queuesWithColor, setQueuesWithColor] = useState<(Queue & { tintColor: string })[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
    const { joinedQueues,leaveQueue, removeQueue } = useAuth();

    useEffect(() => {
        if (joinedQueues.length > 0) {
            const queuesWithColors = joinedQueues.map((queue) => ({
                ...queue,
                tintColor: generateRandomColor(),
            }));
            setQueuesWithColor(queuesWithColors);
        }
    }, [joinedQueues]);

    useEffect(() => {
        addBreadcrumb(router.asPath);
    }, [router.pathname, addBreadcrumb, router.asPath]);
  

    const handleLeaveQueue = async(id: string) => {
      if (findQueue(joinedQueues,id)) {
        await leaveQueue(id);

      }
    };

    const handleDeleteQueue = async(id: string) => {
        removeQueue(id);
    }

    const handleJoinQueue = async() => {}

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
            <h2 className="text-xl my-3 font-semibold">Joined Queues</h2>
            <AnimationWrapper>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                { filteredQueues.map(({ tintColor, ...rest }) => (
                    <QueueCard
                        key={rest.id}
                        queue={rest}
                        isJoined={findQueue(joinedQueues, rest.id)}
                        onJoin={handleJoinQueue}
                        onLeave={handleLeaveQueue}
                        tintColor={tintColor}
                         onDeleteQueue={handleDeleteQueue}                    />
                ))}
            </div>
            {!(filteredQueues.length > 0) && (<div className='w-full justify-center items-center mx-auto'>
                <h3 className='text-center text-gray-600'>You Have not joined any Queue</h3>
            </div>)}
            </AnimationWrapper>
        </div>
    );
};

export default JoinedQueue;
