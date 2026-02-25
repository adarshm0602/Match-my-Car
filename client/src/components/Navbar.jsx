import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Match My Car</Link>
      <div className="navbar-links">
        <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
          Browse
        </Link>
        <Link to="/compare" className={`navbar-link ${isActive('/compare') ? 'active' : ''}`}>
          Compare
        </Link>
        <Link to="/recommend" className={`navbar-link ${isActive('/recommend') ? 'active' : ''}`}>
          AI Advisor
        </Link>
        <Link to="/admin" className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}>
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
