import React from 'react';
import { Droplet, Menu } from 'lucide-react';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <Droplet className="brand-icon" size={28} />
          <span className="brand-name">Oil Around The Globe</span>
        </Link>
        
        <div className="navbar-links">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} end>Home</NavLink>
          <NavLink to="/category/Latest Headlines" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Latest Headlines</NavLink>
          <NavLink to="/category/OPEC Updates" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>OPEC Updates</NavLink>
          <NavLink to="/category/Supply Chain" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Supply Chain</NavLink>
          <NavLink to="/category/Market Analysis" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Market Analysis</NavLink>
        </div>
        
        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
