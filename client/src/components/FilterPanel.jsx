/**
 * FilterPanel Component
 * 
 * Sidebar with all filter options:
 * - Brand dropdown
 * - Body type checkboxes
 * - Price range sliders
 * - Fuel type checkboxes
 * - Transmission radio buttons
 * - Seating capacity checkboxes
 */

import { useState, useEffect } from 'react';
import { getBrands, getBodyTypes, getPriceRange } from '../services/api';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const [brands, setBrands] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [brandsData, bodyTypesData, priceRangeData] = await Promise.all([
          getBrands(),
          getBodyTypes(),
          getPriceRange(),
        ]);
        setBrands(brandsData);
        setBodyTypes(bodyTypesData);
        setPriceRange(priceRangeData);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleBrandChange = (e) => {
    onFilterChange({ brand: e.target.value || null });
  };

  const handleBodyTypeChange = (bodyType) => {
    const currentBodyTypes = filters.bodyType || [];
    let newBodyTypes;
    
    if (currentBodyTypes.includes(bodyType)) {
      newBodyTypes = currentBodyTypes.filter((bt) => bt !== bodyType);
    } else {
      newBodyTypes = [...currentBodyTypes, bodyType];
    }
    
    onFilterChange({ bodyType: newBodyTypes.length > 0 ? newBodyTypes : null });
  };

  const handlePriceChange = (type, value) => {
    onFilterChange({
      [type]: value ? Number(value) : null,
    });
  };

  const handleFuelTypeChange = (fuelType) => {
    const currentFuelTypes = filters.fuelType || [];
    let newFuelTypes;
    
    if (currentFuelTypes.includes(fuelType)) {
      newFuelTypes = currentFuelTypes.filter((ft) => ft !== fuelType);
    } else {
      newFuelTypes = [...currentFuelTypes, fuelType];
    }
    
    onFilterChange({ fuelType: newFuelTypes.length > 0 ? newFuelTypes : null });
  };

  const handleTransmissionChange = (transmission) => {
    onFilterChange({
      transmission: filters.transmission === transmission ? null : transmission,
    });
  };

  const handleSeatingChange = (seating) => {
    onFilterChange({
      seating: filters.seating === seating ? null : Number(seating),
    });
  };

  if (loading) {
    return (
      <div className="filter-panel">
        <div className="filter-panel-loading">Loading filters...</div>
      </div>
    );
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filters</h3>
        <button className="clear-filters-btn" onClick={onClearFilters}>
          Clear All
        </button>
      </div>

      {/* Brand Filter */}
      <div className="filter-section">
        <label className="filter-label">Brand</label>
        <select
          className="filter-select"
          value={filters.brand || ''}
          onChange={handleBrandChange}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Body Type Filter */}
      <div className="filter-section">
        <label className="filter-label">Body Type</label>
        <div className="filter-checkboxes">
          {bodyTypes.map((bodyType) => (
            <label key={bodyType} className="filter-checkbox">
              <input
                type="checkbox"
                checked={(filters.bodyType || []).includes(bodyType)}
                onChange={() => handleBodyTypeChange(bodyType)}
              />
              <span>{bodyType}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <label className="filter-label">Price Range</label>
        <div className="price-range">
          <div className="price-input-group">
            <label>Min: ₹{((filters.minPrice || priceRange.minPrice) / 100000).toFixed(1)}L</label>
            <input
              type="range"
              min={priceRange.minPrice}
              max={priceRange.maxPrice}
              value={filters.minPrice || priceRange.minPrice}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              step={50000}
            />
          </div>
          <div className="price-input-group">
            <label>Max: ₹{((filters.maxPrice || priceRange.maxPrice) / 100000).toFixed(1)}L</label>
            <input
              type="range"
              min={priceRange.minPrice}
              max={priceRange.maxPrice}
              value={filters.maxPrice || priceRange.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              step={50000}
            />
          </div>
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="filter-section">
        <label className="filter-label">Fuel Type</label>
        <div className="filter-checkboxes">
          {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map((fuelType) => (
            <label key={fuelType} className="filter-checkbox">
              <input
                type="checkbox"
                checked={(filters.fuelType || []).includes(fuelType)}
                onChange={() => handleFuelTypeChange(fuelType)}
              />
              <span>{fuelType}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="filter-section">
        <label className="filter-label">Transmission</label>
        <div className="filter-radio-group">
          <label className="filter-radio">
            <input
              type="radio"
              name="transmission"
              checked={filters.transmission === 'Manual'}
              onChange={() => handleTransmissionChange('Manual')}
            />
            <span>Manual</span>
          </label>
          <label className="filter-radio">
            <input
              type="radio"
              name="transmission"
              checked={filters.transmission === 'Automatic'}
              onChange={() => handleTransmissionChange('Automatic')}
            />
            <span>Automatic</span>
          </label>
        </div>
      </div>

      {/* Seating Capacity Filter */}
      <div className="filter-section">
        <label className="filter-label">Seating Capacity</label>
        <div className="filter-checkboxes">
          {[5, 7].map((seating) => (
            <label key={seating} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.seating === seating}
                onChange={() => handleSeatingChange(seating)}
              />
              <span>{seating} Seater</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
