import { useState, useEffect, useCallback } from 'react';
import { getCars, createCar, updateCar, deleteCar } from '../services/api';
import CarForm from '../components/CarForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('adminApiKey') || '');
  const [authenticated, setAuthenticated] = useState(() => !!sessionStorage.getItem('adminApiKey'));
  const [keyInput, setKeyInput] = useState('');

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // null = list view, 'add' = new car form, car object = edit form
  const [formMode, setFormMode] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCars({ limit: 200 });
      setCars(data.data || []);
    } catch {
      showToast('Failed to load cars', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchCars();
  }, [authenticated, fetchCars]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    sessionStorage.setItem('adminApiKey', keyInput.trim());
    setApiKey(keyInput.trim());
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminApiKey');
    setApiKey('');
    setAuthenticated(false);
    setKeyInput('');
  };

  const handleCreate = async (carData) => {
    try {
      await createCar(carData, apiKey);
      showToast('Car added successfully');
      setFormMode(null);
      fetchCars();
    } catch (err) {
      const msg = err.response?.status === 401 ? 'Invalid API key' : err.response?.data?.message || 'Failed to create car';
      showToast(msg, 'error');
    }
  };

  const handleUpdate = async (carData) => {
    try {
      await updateCar(formMode._id, carData, apiKey);
      showToast('Car updated successfully');
      setFormMode(null);
      fetchCars();
    } catch (err) {
      const msg = err.response?.status === 401 ? 'Invalid API key' : err.response?.data?.message || 'Failed to update car';
      showToast(msg, 'error');
    }
  };

  const handleDelete = async (car) => {
    if (!window.confirm(`Delete ${car.brand} ${car.model}? This cannot be undone.`)) return;
    try {
      await deleteCar(car._id, apiKey);
      showToast('Car deleted');
      fetchCars();
    } catch (err) {
      const msg = err.response?.status === 401 ? 'Invalid API key' : 'Failed to delete car';
      showToast(msg, 'error');
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} L`;
    return price?.toLocaleString('en-IN');
  };

  // ---- Login screen ----
  if (!authenticated) {
    return (
      <div className="admin-page">
        <div className="admin-login-card">
          <h1>Admin Login</h1>
          <p>Enter the API key to manage cars.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="API Key"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              autoFocus
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // ---- Form view (add/edit) ----
  if (formMode) {
    return (
      <div className="admin-page">
        <CarForm
          initialData={formMode === 'add' ? null : formMode}
          onSubmit={formMode === 'add' ? handleCreate : handleUpdate}
          onCancel={() => setFormMode(null)}
        />
      </div>
    );
  }

  // ---- Car list ----
  return (
    <div className="admin-page">
      {toast && <div className={`admin-toast ${toast.type}`}>{toast.message}</div>}

      <div className="admin-header">
        <h1>Car Management</h1>
        <div className="admin-header-actions">
          <button className="btn-primary" onClick={() => setFormMode('add')}>+ Add New Car</button>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {loading ? (
        <p className="admin-loading">Loading cars...</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Body Type</th>
                <th>Base Price</th>
                <th>Variants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => {
                const basePrice = car.variants?.length
                  ? Math.min(...car.variants.map((v) => v.price))
                  : '—';
                return (
                  <tr key={car._id}>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.bodyType}</td>
                    <td>{typeof basePrice === 'number' ? `₹${formatPrice(basePrice)}` : basePrice}</td>
                    <td>{car.variants?.length || 0}</td>
                    <td className="action-cell">
                      <button className="btn-edit" onClick={() => setFormMode(car)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(car)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
              {cars.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-row">No cars found. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
