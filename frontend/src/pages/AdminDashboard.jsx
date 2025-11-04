import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const dashboardCards = [
    {
      title: "Add Product",
      description: "Add new vegetables or fruits to the market",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      link: "/admin/add-product",
      color: "bg-primary-green",
    },
    {
      title: "View All Products",
      description: "View and search all products in the system",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      link: "/admin/products",
      color: "bg-primary-yellow",
    },
    {
      title: "Edit Products",
      description: "Update product information and prices",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      link: "/admin/products",
      color: "bg-primary-green",
    },
    {
      title: "Delete Products",
      description: "Remove products from the system",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      link: "/admin/products",
      color: "bg-red-600",
    },
    {
      title: "Market Statistics",
      description: "View summary stats and analytics",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      link: "/admin/statistics",
      color: "bg-primary-yellow",
    },
    {
      title: "User Management",
      description: "Manage farmers and admin accounts",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      link: "/admin/users",
      color: "bg-primary-green",
    },
  ];

  // Quick stats
  const stats = [
    { label: "Total Products", value: "45", change: "+5 this week" },
    { label: "Active Farmers", value: "1,234", change: "+120 this month" },
    {
      label: "Price Updates Today",
      value: "23",
      change: "Last update: 2h ago",
    },
    { label: "Pending Reviews", value: "8", change: "Needs attention" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-green">
        {/* Header Section */}
        <div className="bg-primary-green text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-lg">
                  Welcome back, {user.fullName || "Admin"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-primary-green px-6 py-2 rounded-lg font-semibold hover:bg-light-green transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-600 text-sm font-medium mb-2">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold text-primary-green mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Management Cards */}
          <div>
            <h2 className="text-2xl font-bold text-primary-green mb-6">
              Management Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow group"
                >
                  <div
                    className={`${card.color} text-white w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary-green mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
                  <div className="mt-4 flex items-center text-primary-green font-semibold">
                    <span>Open</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary-green mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center border-b pb-3">
                <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-semibold text-gray-800">
                    New product added: Tomatoes
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center border-b pb-3">
                <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center text-white font-bold">
                  U
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-semibold text-gray-800">
                    Price updated: Potatoes - Rs. 45/kg
                  </p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white font-bold">
                  N
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-semibold text-gray-800">
                    New farmer registered: Ahmed Khan
                  </p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
