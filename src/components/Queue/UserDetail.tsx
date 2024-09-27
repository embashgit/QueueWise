import React from 'react';

interface UserDetailProps {
  user: {
    name: string;
    email: string; // Add email field
    joinTime: string;
    avatarUrl: string;
    position: number;
  };
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  return (
    <div className=" px-4 bg-white shadow-lg rounded-lg flex flex-row  justify-between items-center w-full relative border">
        <div className='bg-green-600 font-bold rounded-full border border-4 border-green-700 px-3 absolute top-3 border-double right-3 text-white'>
        Currently Attending
        </div>
        <div className='flex flex-col p-4 gap-6 mr-16 w-4/12'>
      <div className="flex-shrink-0 ">
        <div
          className="w-36 h-36 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${user.avatarUrl})` }}
        ></div>
      </div>
      <div className="flex-grow">
      <div className="mb-4">
          <h2 className="text-4xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-lg text-gray-500">{user.email}</p>
          <div className='mt-9'>
          <p className="text-sm text-gray-500">Time Joined: {user.joinTime}</p>
          </div>
    </div>
      </div>
        </div>
      <div className="flex-grow w-8/12">
        <div className="mb-4 flex flex-col gap-4 justify-between items-center">
          <h2 className="text-6xl font-semibold text-gray-900  text-center mb-3">{user.position}</h2>
          <p className="text-2xl text-bold text-gray-600">Current Position in Queue</p>
          <div className='note-section'>
          <h4 className='text-left'>Note:</h4>
          <div className=' h-min-[5rem] rounded-lg w-full bg-gray-100 p-4'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ducimus impedit dolorum quasi eveniet animi optio, atque dicta pariatur doloremque ipsa amet mollitia commodi minus libero ipsam unde magni? Excepturi.</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
