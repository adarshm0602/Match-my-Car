/**
 * CarList Component
 * 
 * Displays a grid of car cards.
 * Shows loading state and "no cars found" message.
 */

import CarCard from './CarCard';
import './CarList.css';

const CarList = ({ cars, loading, error }) => {
  if (loading) {
    return (
      <div className="car-list-loading">
        <div className="spinner"></div>
        <p>Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-list-error">
        <p>❌ Error loading cars: {error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="car-list-empty">
        <p>🚗</p>
        <h3>No cars found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
