import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex justify-center mb-10">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search"
        className="px-5 py-2 w-1/2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellowTheme text-gray-700"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch(query); 
        }}
      />
      <button
        className="ml-3 px-4 py-2 bg-yellowTheme hover:bg-yellow-400 rounded-full text-textColor"
        onClick={() => handleSearch(query)}
      >
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
