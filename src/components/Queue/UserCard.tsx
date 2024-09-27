// src/components/UserCard.tsx
import React from 'react';

interface UserCardProps {
  name: string;
  registrationDate: string;
  avatarUrl: string;
  position: number;
}

const UserCard: React.FC<UserCardProps> = ({ name, registrationDate, avatarUrl, position }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg mb-4">
      <div className="text-gray-700 font-bold mr-4">{position}</div>
      <div
        className="w-12 h-12 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${avatarUrl})` }}
      ></div>
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        <p className="text-sm text-gray-500">Joined At: {registrationDate}</p>
      </div>
    </div>
  );
};

export default UserCard;
