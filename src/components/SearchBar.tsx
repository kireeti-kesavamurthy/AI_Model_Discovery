import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  totalModels: number;
  filteredCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  totalModels,
  filteredCount
}) => {
  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search AI models, developers, or use cases..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 bg-white shadow-sm"
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-indigo-600">{filteredCount}</span> of{' '}
          <span className="font-semibold">{totalModels}</span> AI models
        </p>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Filter className="w-3 h-3" />
          <span>Filter active</span>
        </div>
      </div>
    </div>
  );
};