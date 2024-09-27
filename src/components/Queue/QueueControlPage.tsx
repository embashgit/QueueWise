import React, { useEffect, useState } from 'react';
import { useBreadcrumb } from '../Provider/BreadCrumbContext';
import { useRouter } from 'next/router';
import FilterTabs from '../Form/FilterSearch';
import UserCard from './UserCard';
import { useAuth } from '../Provider/AuthContext';
import UserDetail from './UserDetail';
import { format } from 'date-fns';
import { Button } from '../Buttons';
import queueHistory from '../../../utils/constant';
import PaginatedTable from '../Table';
import { IError } from '../Provider/interface';
import { User } from './interface';
// Define the User interface


const QueueControlPage: React.FC = () => {
  const { addBreadcrumb } = useBreadcrumb();
  const { fetchQueueUsers } = useAuth();
  const router = useRouter();
  
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [users, setUsers] = useState<User[]>([]);
  const [queueName, setQueueName] = useState<string>('');
  const [currentUserIndex, ] = useState<number>(0); // Track the current user index

  useEffect(() => {
    const { queueId } = router.query;

    if (queueId) {
      fetchQueueUsers(queueId as string)
        .then(({ users ,eventType }) => {
          setUsers(users);
          setQueueName(eventType)
        })
        .catch((error: IError) => {
          console.error('Failed to fetch users:', error);
        });
    }

    addBreadcrumb('Control');
  }, [router.query, fetchQueueUsers, addBreadcrumb]);

  const filteredUsers = users.sort((a: User, b: User) => {
    if (selectedFilter === 'Oldest') {
      return new Date(a.joinTime).getTime() - new Date(b.joinTime).getTime();
    } else if (selectedFilter === 'Newest') {
      return new Date(b.joinTime).getTime() - new Date(a.joinTime).getTime();
    } else {
      return 0; // No sorting for "All"
    }
  });

  const currentUser = filteredUsers[currentUserIndex]; // Get the current user


  return (
    <div className="mt-6">
      <div className="flex flex-row space-3 justify-between w-full">
        <div className="w-4/10 flex flex-col pr-3">
        <div className='py-2 '>
            <h6 className='text-sm text-gray-600'>Queue Name:</h6>
        <h2 className='text-xl text-gray-700 font-bold'>{queueName}</h2>
        </div>
          <FilterTabs selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={index}
                position={index + 1}  // Use the index as the position
                name={user.name}
                registrationDate={format(new Date(user.joinTime), 'dd MMM yyyy, h:mm a')}  // Format the date here
                avatarUrl={`https://i.pravatar.cc/${300 + index}`}
              />
            ))}
          </div>
        </div>
        <div className="w-8/10 items-center mx-auto ">
        <div className='flex flex-col '>
          {currentUser ? (
            <UserDetail
              user={{...currentUser, joinTime:format(new Date(currentUser.joinTime), 'dd MMM yyyy, h:mm a'), avatarUrl:'https://i.pravatar.cc/300'}}
            />
          ) : (
            <p className="text-center text-gray-500">No more users in the queue.</p>
          )}
            <div className="mt-6 flex space-x-4">
          <Button
             onClick={()=>null}
             size={"fill"}
             variant={"secondary"}
            className="px-4 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Call Next Person
          </Button>
          <Button
            onClick={()=>null}
            size={"fill"}
             variant={"secondary"}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600"
          >
            Mark as Complete
          </Button>
        </div>
        </div>
             {/* Queue History Table */}
            <PaginatedTable data={queueHistory}/>
        </div>
      </div>
    </div>
  );
};

export default QueueControlPage;
