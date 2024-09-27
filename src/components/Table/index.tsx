import {  ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

interface QueueHistory {
  name: string;
  email: string;
  joinTime: string;
  leaveTime: string;
}

interface PaginatedTableProps {
  data: QueueHistory[];
  itemsPerPage?: number; // Default items per page is optional
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({ data, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the items to display on the current page
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full mt-3">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Queue History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left text-gray-600 font-semibold">Name</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-gray-600 font-semibold">Email</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-gray-600 font-semibold">Time Joined</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-gray-600 font-semibold">Time Left</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 text-gray-500 px-4 border-t border-gray-200">{entry.name}</td>
                <td className="py-2 text-gray-500 px-4 border-t border-gray-200">{entry.email}</td>
                <td className="py-2 text-gray-500 px-4 border-t border-gray-200">{entry.joinTime}</td>
                <td className="py-2 text-gray-500 px-4 border-t border-gray-200">{entry.leaveTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <ArrowNarrowLeftIcon className='h-5'/>
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <ArrowNarrowRightIcon className='h-5'/>
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
