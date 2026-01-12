/**
 * CarDetailPage Component
 * 
 * Displays detailed information about a single car including:
 * - Images
 * - Full specifications
 * - Engine details
 * - Safety features
 * - All variants with prices
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '../services/api';
import './CarDetailPage.css';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getCarById(id);
        setCar(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load car details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="car-detail-page">
        <div className="car-detail-loading">
          <div className="spinner"></div>
          <p>Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="car-detail-page">
        <div className="car-detail-error">
          <p>❌ {error || 'Car not found'}</p>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-detail-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Results
      </button>

      <div className="car-detail-header">
        <h1>
          {car.brand} {car.model}
        </h1>
        <p className="car-detail-body-type">{car.bodyType}</p>
      </div>

      <div className="car-detail-content">
        {/* Images Section */}
        <div className="car-detail-images">
          {car.images && car.images.length > 0 ? (
            <div className="car-image-main">
              <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
            </div>
          ) : (
            <div className="car-image-placeholder">
              <span>🚗</span>
              <p>{car.brand} {car.model}</p>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="car-detail-section">
          <h2>Basic Information</h2>
          <div className="car-detail-grid">
            <div className="car-detail-item">
              <span className="label">Brand:</span>
              <span className="value">{car.brand}</span>
            </div>
            <div className="car-detail-item">
              <span className="label">Model:</span>
              <span className="value">{car.model}</span>
            </div>
            <div className="car-detail-item">
              <span className="label">Body Type:</span>
              <span className="value">{car.bodyType}</span>
            </div>
            <div className="car-detail-item">
              <span className="label">Seating:</span>
              <span className="value">{car.seatingCapacity} Seater</span>
            </div>
            {car.launchYear && (
              <div className="car-detail-item">
                <span className="label">Launch Year:</span>
                <span className="value">{car.launchYear}</span>
              </div>
            )}
          </div>
        </div>

        {/* Engine Specifications */}
        {car.engine && (
          <div className="car-detail-section">
            <h2>Engine Specifications</h2>
            <div className="car-detail-grid">
              {car.engine.engineCapacity && (
                <div className="car-detail-item">
                  <span className="label">Engine Capacity:</span>
                  <span className="value">{car.engine.engineCapacity} cc</span>
                </div>
              )}
              {car.engine.cylinders && (
                <div className="car-detail-item">
                  <span className="label">Cylinders:</span>
                  <span className="value">{car.engine.cylinders}</span>
                </div>
              )}
              {car.engine.maxPower && (
                <div className="car-detail-item">
                  <span className="label">Max Power:</span>
                  <span className="value">{car.engine.maxPower}</span>
                </div>
              )}
              {car.engine.maxTorque && (
                <div className="car-detail-item">
                  <span className="label">Max Torque:</span>
                  <span className="value">{car.engine.maxTorque}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Safety Features */}
        {car.safety && (
          <div className="car-detail-section">
            <h2>Safety Features</h2>
            <div className="car-detail-grid">
              {car.safety.airbags && (
                <div className="car-detail-item">
                  <span className="label">Airbags:</span>
                  <span className="value">{car.safety.airbags}</span>
                </div>
              )}
              <div className="car-detail-item">
                <span className="label">ABS:</span>
                <span className="value">{car.safety.abs ? 'Yes' : 'No'}</span>
              </div>
              <div className="car-detail-item">
                <span className="label">ESC:</span>
                <span className="value">{car.safety.esc ? 'Yes' : 'No'}</span>
              </div>
              <div className="car-detail-item">
                <span className="label">Rear Camera:</span>
                <span className="value">{car.safety.rearCamera ? 'Yes' : 'No'}</span>
              </div>
              {car.safety.globalNCAPRating !== undefined && (
                <div className="car-detail-item">
                  <span className="label">Global NCAP Rating:</span>
                  <span className="value">
                    {car.safety.globalNCAPRating}/5 ⭐
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Variants */}
        {car.variants && car.variants.length > 0 && (
          <div className="car-detail-section">
            <h2>Available Variants</h2>
            <div className="variants-table">
              <table>
                <thead>
                  <tr>
                    <th>Variant Name</th>
                    <th>Price</th>
                    <th>Fuel Type</th>
                    <th>Transmission</th>
                    <th>Mileage</th>
                  </tr>
                </thead>
                <tbody>
                  {car.variants.map((variant, index) => (
                    <tr key={index}>
                      <td>{variant.name}</td>
                      <td className="price-cell">{formatPrice(variant.price)}</td>
                      <td>{variant.fuelType}</td>
                      <td>{variant.transmission}</td>
                      <td>
                        {variant.mileage}
                        {variant.fuelType === 'Electric' ? ' km/charge' : ' km/l'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailPage;
