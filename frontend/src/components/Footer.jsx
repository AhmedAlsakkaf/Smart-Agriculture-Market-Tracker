import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary-green text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm opacity-90">
              Smart Agriculture Market Tracker empowers Pakistani farmers with
              real-time market data, weather insights, and community support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="opacity-90 hover:text-light-green transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/market"
                  className="opacity-90 hover:text-light-green transition-colors"
                >
                  Market Rates
                </Link>
              </li>
              <li>
                <Link
                  to="/weather"
                  className="opacity-90 hover:text-light-green transition-colors"
                >
                  Weather Updates
                </Link>
              </li>
              <li>
                <Link
                  to="/forum"
                  className="opacity-90 hover:text-light-green transition-colors"
                >
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="opacity-90 hover:text-light-green transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="opacity-90 hover:text-light-green transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="opacity-90 hover:text-light-green transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="opacity-90 hover:text-light-green transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Email: ahmedalsakkaf.pk</li>
              <li>Phone: +92 3440580996</li>
              <li>Location: Pakistan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="opacity-80">
              &copy; 2025 Smart Agriculture Market Tracker. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link
                to="/privacy"
                className="opacity-80 hover:text-light-green transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="opacity-80 hover:text-light-green transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
