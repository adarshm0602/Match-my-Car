/**
 * SearchBar Component
 * 
 * Text input for searching cars by brand or model.
 * Uses debouncing to avoid too many API calls while typing.
 */

import { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, debounceMs = 500 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Store onSearch in a ref to avoid dependency issues
  const onSearchRef = useRef(onSearch);
  
  // Update ref when onSearch changes
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Debounce the search - wait for user to stop typing
  useEffect(() => {
    // Don't call onSearch on initial mount if searchTerm is empty
    if (searchTerm === '') {
      return;
    }
    
    const timer = setTimeout(() => {
      onSearchRef.current(searchTerm);
    }, debounceMs);

    // Cleanup: clear timer if user types again before delay completes
    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]); // Removed onSearch from dependencies - using useRef pattern instead

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearchRef.current('');
  };

  return (
    <div className="search-bar">
      <div className="search-bar-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search by brand or model..."
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button className="search-bar-clear" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
