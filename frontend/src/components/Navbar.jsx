import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">LinkSnip</Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <div className="navbar-user">
            <Link to="/dashboard" className="nav-link">My Links</Link>
            <span className="user-name">{user.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link btn-primary">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
