/**
 * HomePage Component
 * 
 * Main page with car listing, filters, search, sorting, and pagination.
 * Manages all filter state and fetches cars from API.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getCars } from '../services/api';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import CarList from '../components/CarList';
import Pagination from '../components/Pagination';
import './HomePage.css';

const HomePage = () => {
  // Filter state - all filter values
  const [filters, setFilters] = useState({
    brand: null,
    bodyType: null,
    minPrice: null,
    maxPrice: null,
    fuelType: null,
    transmission: null,
    seating: null,
    search: '',
    sortBy: '',
    order: '',
    page: 1,
    limit: 12,
  });
  
  // Use ref to track previous filters for comparison
  const prevFiltersRef = useRef();

  // Cars data and UI state
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalCars: 0,
    totalPages: 1,
  });

  // Fetch cars whenever filters change
  useEffect(() => {
    // Deep compare filters to avoid unnecessary API calls
    const filtersStr = JSON.stringify(filters);
    const prevFiltersStr = prevFiltersRef.current ? JSON.stringify(prevFiltersRef.current) : null;
    
    if (filtersStr === prevFiltersStr) {
      // Filters haven't actually changed, skip fetch
      return;
    }
    
    // Update ref for next comparison
    prevFiltersRef.current = filters;
    
    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query object from filters
        const queryParams = {
          page: filters.page,
          limit: filters.limit,
        };

        // Add filters to query if they exist
        if (filters.brand) queryParams.brand = filters.brand;
        if (filters.bodyType) {
          // Handle array of body types - use first one for now
          if (Array.isArray(filters.bodyType) && filters.bodyType.length > 0) {
            queryParams.bodyType = filters.bodyType[0];
          } else if (!Array.isArray(filters.bodyType)) {
            queryParams.bodyType = filters.bodyType;
          }
        }
        if (filters.minPrice) queryParams.minPrice = filters.minPrice;
        if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
        if (filters.fuelType) {
          // Handle array of fuel types - use first one for now
          if (Array.isArray(filters.fuelType) && filters.fuelType.length > 0) {
            queryParams.fuelType = filters.fuelType[0];
          } else if (!Array.isArray(filters.fuelType)) {
            queryParams.fuelType = filters.fuelType;
          }
        }
        if (filters.transmission) queryParams.transmission = filters.transmission;
        if (filters.seating) queryParams.seating = filters.seating;
        // Handle search: parse "brand model" format
        if (filters.search) {
          const searchTerms = filters.search.trim().split(/\s+/);
          if (searchTerms.length > 0) {
            queryParams.brand = searchTerms[0]; // First word is brand
          }
          if (searchTerms.length > 1) {
            queryParams.model = searchTerms.slice(1).join(' '); // Rest is model
          }
        }
        if (filters.sortBy) queryParams.sortBy = filters.sortBy;
        if (filters.order) queryParams.order = filters.order;

        const response = await getCars(queryParams);
        
        setCars(response.data || []);
        setPagination({
          page: response.page || 1,
          limit: response.limit || 12,
          totalCars: response.totalCars || 0,
          totalPages: response.totalPages || 1,
        });
      } catch (err) {
        setError(err.message || 'Failed to load cars');
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  }, []);

  // Handle search
  const handleSearch = useCallback((searchTerm) => {
    handleFilterChange({ search: searchTerm, brand: searchTerm || null });
  }, [handleFilterChange]);

  // Handle sort change
  const handleSortChange = ({ sortBy, order }) => {
    handleFilterChange({ sortBy, order });
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      brand: null,
      bodyType: null,
      minPrice: null,
      maxPrice: null,
      fuelType: null,
      transmission: null,
      seating: null,
      search: '',
      sortBy: '',
      order: '',
      page: 1,
      limit: 12,
    });
  };

  return (
    <div className="home-page">
      <div className="home-page-header">
        <h1>🚗 Match My Car</h1>
        <p>Find your perfect car match</p>
      </div>

      <div className="home-page-content">
        {/* Filter Sidebar */}
        <aside className="home-page-sidebar">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </aside>

        {/* Main Content */}
        <main className="home-page-main">
          {/* Search and Sort Bar */}
          <div className="home-page-controls">
            <SearchBar onSearch={handleSearch} />
            <SortDropdown
              value={{ sortBy: filters.sortBy, order: filters.order }}
              onChange={handleSortChange}
            />
          </div>

          {/* Results Count */}
          {!loading && !error && (
            <div className="results-count">
              Found {pagination.totalCars} car{pagination.totalCars !== 1 ? 's' : ''}
            </div>
          )}

          {/* Car List */}
          <CarList cars={cars} loading={loading} error={error} />

          {/* Pagination */}
          {!loading && !error && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
