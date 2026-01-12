/**
 * CarCard Component
 * 
 * Displays a single car as a card with basic information.
 * Clicking the card navigates to the car detail page.
 */

import { useNavigate } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  // Get the lowest price from all variants
  const getLowestPrice = () => {
    if (!car.variants || car.variants.length === 0) return 'N/A';
    const prices = car.variants.map((v) => v.price);
    return Math.min(...prices);
  };

  // Format price in Indian currency format
  const formatPrice = (price) => {
    if (price === 'N/A') return price;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleClick = () => {
    navigate(`/car/${car._id}`);
  };

  return (
    <div className="car-card" onClick={handleClick}>
      <div className="car-card-image">
        {car.images && car.images.length > 0 ? (
          <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
        ) : (
          <div className="car-card-placeholder">
            <span>🚗</span>
            <p>{car.brand} {car.model}</p>
          </div>
        )}
      </div>
      <div className="car-card-content">
        <h3 className="car-card-title">
          {car.brand} {car.model}
        </h3>
        <p className="car-card-body-type">{car.bodyType}</p>
        <div className="car-card-specs">
          <span>👥 {car.seatingCapacity} Seater</span>
          {car.launchYear && <span>📅 {car.launchYear}</span>}
        </div>
        <div className="car-card-price">
          Starting from {formatPrice(getLowestPrice())}
        </div>
        {car.variants && car.variants.length > 1 && (
          <div className="car-card-variants">
            {car.variants.length} variants available
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
