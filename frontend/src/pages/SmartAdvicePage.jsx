import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const SmartAdvicePage = () => {
  const navigate = useNavigate();
  const [adviceList, setAdviceList] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // TODO: Replace with actual API call (can integrate OpenAI/LLM later)
    const mockAdvice = [
      {
        id: 1,
        type: "market",
        title: "Tomato Prices Rising",
        description:
          "Tomato prices have increased by 15% over the last 3 days.",
        recommendation:
          "If you have tomato stock, now is a good time to sell. Prices are expected to remain high for the next 2-3 days.",
        priority: "high",
        date: "2 hours ago",
      },
      {
        id: 2,
        type: "weather",
        title: "Rain Expected Tomorrow",
        description:
          "Weather forecast shows 80% chance of rain tomorrow afternoon.",
        recommendation:
          "Avoid watering crops today. Postpone any spray applications until after the rain.",
        priority: "medium",
        date: "4 hours ago",
      },
      {
        id: 3,
        type: "seasonal",
        title: "Best Time for Planting",
        description:
          "Current season and weather conditions are ideal for planting.",
        recommendation:
          "Consider planting wheat or winter vegetables. Soil temperature and moisture levels are optimal.",
        priority: "medium",
        date: "1 day ago",
      },
      {
        id: 4,
        type: "market",
        title: "Onion Demand Increasing",
        description:
          "Market demand for onions is rising due to upcoming festivities.",
        recommendation:
          "Hold your onion stock for another week. Prices are likely to increase by 10-15%.",
        priority: "high",
        date: "1 day ago",
      },
      {
        id: 5,
        type: "weather",
        title: "High Temperature Alert",
        description: "Temperature expected to reach 38°C over the next 3 days.",
        recommendation:
          "Increase irrigation frequency. Provide shade for sensitive crops. Early morning watering is recommended.",
        priority: "high",
        date: "5 hours ago",
      },
      {
        id: 6,
        type: "pest",
        title: "Pest Alert in Region",
        description: "Reports of aphid infestation in nearby farms.",
        recommendation:
          "Inspect your crops regularly. Use neem oil spray as a preventive measure. Maintain good field hygiene.",
        priority: "medium",
        date: "6 hours ago",
      },
      {
        id: 7,
        type: "market",
        title: "Potato Prices Declining",
        description:
          "Potato prices have dropped by 8% due to increased supply.",
        recommendation:
          "If you have potato stock, wait for prices to stabilize. Consider storing if you have cold storage facility.",
        priority: "low",
        date: "2 days ago",
      },
      {
        id: 8,
        type: "seasonal",
        title: "Fertilizer Application Time",
        description:
          "Crops have reached the stage where fertilizer application will be most effective.",
        recommendation:
          "Apply nitrogen-based fertilizer in the early morning. Follow recommended dosage for your crop type.",
        priority: "medium",
        date: "12 hours ago",
      },
    ];

    setAdviceList(mockAdvice);
  }, []);

  const filteredAdvice =
    filter === "all"
      ? adviceList
      : adviceList.filter((advice) => advice.type === filter);

  const getTypeColor = (type) => {
    switch (type) {
      case "market":
        return "bg-primary-green text-white";
      case "weather":
        return "bg-blue-500 text-white";
      case "seasonal":
        return "bg-primary-yellow text-white";
      case "pest":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "market":
        return (
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
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        );
      case "weather":
        return (
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
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        );
      case "seasonal":
        return (
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "pest":
        return (
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-green py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/farmer")}
              className="flex items-center text-primary-green hover:text-opacity-80 mb-4"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-primary-green">
              Smart Farming Advice
            </h1>
            <p className="text-gray-600 mt-2">
              AI-powered recommendations based on market trends and weather
              conditions
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "all"
                    ? "bg-primary-green text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Advice
              </button>
              <button
                onClick={() => setFilter("market")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "market"
                    ? "bg-primary-green text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Market Trends
              </button>
              <button
                onClick={() => setFilter("weather")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "weather"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Weather-Based
              </button>
              <button
                onClick={() => setFilter("seasonal")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "seasonal"
                    ? "bg-primary-yellow text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Seasonal
              </button>
              <button
                onClick={() => setFilter("pest")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "pest"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pest Alerts
              </button>
            </div>
          </div>

          {/* Advice Cards */}
          <div className="space-y-4">
            {filteredAdvice.map((advice) => (
              <div
                key={advice.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`${getTypeColor(
                          advice.type
                        )} p-3 rounded-lg`}
                      >
                        {getTypeIcon(advice.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-primary-green">
                            {advice.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(
                              advice.priority
                            )}`}
                          >
                            {advice.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {advice.description}
                        </p>
                        <div className="bg-light-green p-4 rounded-lg border-l-4 border-primary-green">
                          <p className="font-semibold text-primary-green text-sm mb-1">
                            Recommendation:
                          </p>
                          <p className="text-gray-700">
                            {advice.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
                    <span className="capitalize">{advice.type} Advice</span>
                    <span>{advice.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAdvice.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">
                No advice available for this category
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-primary-green mb-3">
              How Smart Advice Works
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>AI-Powered Insights:</strong> Our system analyzes
                real-time market data, weather patterns, and seasonal trends to
                provide personalized farming recommendations.
              </p>
              <p>
                <strong>Market Trends:</strong> Get notified when prices are
                rising or falling, helping you make informed decisions about
                when to sell your produce.
              </p>
              <p>
                <strong>Weather Integration:</strong> Advice automatically
                adjusts based on current and forecasted weather conditions in
                your region.
              </p>
              <p>
                <strong>Priority Levels:</strong> Each advice is categorized by
                priority (High, Medium, Low) to help you focus on the most
                critical actions first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SmartAdvicePage;
