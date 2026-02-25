import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import RecommendPage from './pages/RecommendPage';
import ComparePage from './pages/ComparePage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
