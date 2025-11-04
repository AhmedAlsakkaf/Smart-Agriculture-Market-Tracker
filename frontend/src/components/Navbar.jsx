import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary-green text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-yellow rounded-lg flex items-center justify-center font-bold text-primary-green">
              SA
            </div>
            <span className="font-bold text-xl">Smart Agri Tracker</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-light-green transition">
              Home
            </Link>
            <Link to="/market" className="hover:text-light-green transition">
              Market Rates
            </Link>
            <Link to="/weather" className="hover:text-light-green transition">
              Weather
            </Link>
            <Link to="/forum" className="hover:text-light-green transition">
              Community
            </Link>
            <Link
              to="/login"
              className="bg-primary-yellow text-primary-green px-4 py-2 rounded hover:opacity-90 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
