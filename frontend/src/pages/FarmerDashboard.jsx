import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [weatherData, setWeatherData] = useState(null);
  const [smartAdvice, setSmartAdvice] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    // Mock weather data
    setWeatherData({
      city: user.location || "Karachi",
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 65,
      rainfall: "No rain expected",
    });

    // Mock smart advice
    setSmartAdvice([
      {
        id: 1,
        type: "weather",
        title: "Good weather for harvesting",
        message:
          "Clear skies expected for the next 3 days. Ideal time for harvesting.",
        priority: "info",
      },
      {
        id: 2,
        type: "market",
        title: "Tomato prices rising",
        message:
          "Tomato prices increased by 15%. Good time to sell if you have stock.",
        priority: "success",
      },
      {
        id: 3,
        type: "warning",
        title: "Rain expected tomorrow",
        message:
          "Avoid watering crops today. Rain expected tomorrow afternoon.",
        priority: "warning",
      },
    ]);
  }, [user.location]);

  const farmerCards = [
    {
      title: "Market Rates",
      description: "View current prices of vegetables and fruits",
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      link: "/farmer/market-rates",
      color: "bg-primary-green",
    },
    {
      title: "Price Trends",
      description: "View 7-day price trends and charts",
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
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
      link: "/farmer/price-trends",
      color: "bg-primary-yellow",
    },
    {
      title: "Weather Updates",
      description: "Live weather data for your region",
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
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
      link: "/farmer/weather",
      color: "bg-blue-500",
    },
    {
      title: "Smart Advice",
      description: "AI-powered farming recommendations",
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      link: "/farmer/smart-advice",
      color: "bg-primary-green",
    },
    {
      title: "Community Forum",
      description: "Connect with fellow farmers",
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
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      ),
      link: "/farmer/forum",
      color: "bg-primary-yellow",
    },
    {
      title: "My Posts",
      description: "View and manage your forum posts",
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      link: "/farmer/my-posts",
      color: "bg-primary-green",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "success":
        return "bg-green-100 border-green-500 text-green-800";
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

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
                <h1 className="text-4xl font-bold mb-2">Farmer Dashboard</h1>
                <p className="text-lg">
                  Welcome back, {user.fullName || "Farmer"}
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

        <div className="container mx-auto px-4 py-8">
          {/* Weather Widget */}
          {weatherData && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-primary-green mb-2">
                    Current Weather - {weatherData.city}
                  </h2>
                  <div className="flex items-center gap-8 mt-4">
                    <div>
                      <p className="text-5xl font-bold text-gray-800">
                        {weatherData.temperature}°C
                      </p>
                      <p className="text-gray-600">{weatherData.condition}</p>
                    </div>
                    <div className="text-gray-600">
                      <p className="mb-2">Humidity: {weatherData.humidity}%</p>
                      <p>{weatherData.rainfall}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/farmer/weather"
                  className="bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  View Detailed Weather
                </Link>
              </div>
            </div>
          )}

          {/* Smart Advice Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary-green">
                Smart Farming Advice
              </h2>
              <Link
                to="/farmer/smart-advice"
                className="text-primary-green hover:text-opacity-80 font-semibold"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {smartAdvice.slice(0, 3).map((advice) => (
                <div
                  key={advice.id}
                  className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(
                    advice.priority
                  )}`}
                >
                  <h3 className="font-bold mb-1">{advice.title}</h3>
                  <p className="text-sm">{advice.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-primary-green mb-6">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerCards.map((card, index) => (
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Products Tracked
              </h3>
              <p className="text-3xl font-bold text-primary-green">45</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Forum Posts
              </h3>
              <p className="text-3xl font-bold text-primary-green">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Price Alerts
              </h3>
              <p className="text-3xl font-bold text-primary-green">5</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FarmerDashboard;
