/**
 * App Component
 * 
 * Main app component with React Router setup.
 * Defines all routes for the application.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
