// src/components/FilterTabs.tsx
import React from 'react';
import { FilterTabsProps } from './interface';



const FilterTabs: React.FC<FilterTabsProps> = ({ selectedFilter, onFilterChange }) => {
  const tabs = ['All', 'Oldest', 'Newest'];

  return (
    <div className="flex space-x-4 bg-white p-2 rounded-lg shadow mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onFilterChange(tab)}
          className={`py-2 px-4 rounded-lg text-sm font-medium ${
            selectedFilter === tab ? 'bg-gray-200 text-black' : 'text-gray-600'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
