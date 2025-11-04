import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary-green text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-yellow rounded-lg flex items-center justify-center font-bold text-primary-green">
              SA
            </div>
            <span className="font-bold text-xl">
              Smart Agriculture Market Tracker
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-light-green transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/market"
              className="hover:text-light-green transition-colors duration-200"
            >
              Market Rates
            </Link>
            <Link
              to="/weather"
              className="hover:text-light-green transition-colors duration-200"
            >
              Weather
            </Link>
            <Link
              to="/forum"
              className="hover:text-light-green transition-colors duration-200"
            >
              Community Forum
            </Link>
            <Link
              to="/login"
              className="bg-primary-yellow text-primary-green px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-primary-green transition-all duration-200"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden hover:text-light-green transition-colors">
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
    </header>
  );
};

export default Header;
