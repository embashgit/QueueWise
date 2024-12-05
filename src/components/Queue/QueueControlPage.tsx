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

const QueueControlPage: React.FC = () => {
  const { addBreadcrumb } = useBreadcrumb();
  const { fetchQueueUsers, callNextWaiter } = useAuth();
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [users, setUsers] = useState<User[]>([]);
  const [queueName, setQueueName] = useState<string>('');
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(-1);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const { queueId } = router.query;

    if (queueId) {
      fetchQueueUsers(queueId as string)
        .then(({ users, eventType }) => {
          setUsers(users as any);
          setQueueName(eventType);
        })
        .catch((error: IError) => {
          console.error('Failed to fetch users:', error);
        });
    }

    addBreadcrumb('Control');
  }, [router.query, fetchQueueUsers, addBreadcrumb]);

  const callUser = async () => {
    const { queueId } = router.query;

    if (!queueId) return;

    // Move to the next user in the filtered list
    const nextIndex = currentUserIndex + 1;

    if (nextIndex >= users.length) {
      setCurrentUser(null); // No more users in the queue
      console.log("No more users in the queue.");
      return;
    }

    const nextUser = users[nextIndex];

    try {
      const res = await callNextWaiter(nextUser.id, queueId as string);

      if (res?.user?.isCurrent) {
        setCurrentUser(nextUser); // Update the current user
        setCurrentUserIndex(nextIndex); // Move the index forward
      } else {
        console.error("Failed to set the next user as current:", res);
      }
    } catch (error) {
      console.error("Error calling next waiter:", error);
    }
  };

  const filteredUsers = users.sort((a: User, b: User) => {
    if (selectedFilter === 'Oldest') {
      return new Date(a.joinTime).getTime() - new Date(b.joinTime).getTime();
    } else if (selectedFilter === 'Newest') {
      return new Date(b.joinTime).getTime() - new Date(a.joinTime).getTime();
    } else {
      return 0; // No sorting for "All"
    }
  });

  return (
    <div className="mt-6">
      <div className="flex flex-row space-3 justify-between w-full">
        <div className="w-4/10 flex flex-col pr-3">
          <div className="py-2">
            <h6 className="text-sm text-gray-600">Queue Name:</h6>
            <h2 className="text-xl text-gray-700 font-bold">{queueName}</h2>
          </div>
          <FilterTabs selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={index}
                position={index + 1}
                name={user.name}
                registrationDate={format(new Date(user.joinTime), 'dd MMM yyyy, h:mm a')}
                avatarUrl={`https://i.pravatar.cc/${300 + index}`}
              />
            ))}
          </div>
        </div>
        <div className="w-8/10 items-center mx-auto">
          <div className="flex flex-col">
            {currentUser ? (
              <UserDetail
                user={{
                  ...currentUser,
                  joinTime: format(new Date(currentUser.joinTime), 'dd MMM yyyy, h:mm a'),
                  avatarUrl: 'https://i.pravatar.cc/300',
                }}
              />
            ) : (
              <div className="py-9">
                <p className="text-center text-gray-500">You can call the next user now.</p>
              </div>
            )}
            <div className="mt-6 flex space-x-4">
              <Button
                onClick={callUser}
                size="fill"
                variant="secondary"
                className="px-4 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Call Next Person
              </Button>
              <Button
                onClick={() => null}
                size="fill"
                variant="secondary"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Mark as Complete
              </Button>
            </div>
          </div>
          {/* Queue History Table */}
          <PaginatedTable data={queueHistory} />
        </div>
      </div>
    </div>
  );
};

export default QueueControlPage;
