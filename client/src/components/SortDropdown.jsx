/**
 * SortDropdown Component
 * 
 * Dropdown to sort cars by price or launch year.
 */

import './SortDropdown.css';

const SortDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'launchYear-desc', label: 'Newest First' },
    { value: 'launchYear-asc', label: 'Oldest First' },
  ];

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === '') {
      onChange({ sortBy: '', order: '' });
    } else {
      const [sortBy, order] = selectedValue.split('-');
      onChange({ sortBy, order });
    }
  };

  const currentValue = value.sortBy && value.order 
    ? `${value.sortBy}-${value.order}` 
    : '';

  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        className="sort-select"
        value={currentValue}
        onChange={handleChange}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
