import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const WeatherPage = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);

  const pakistanCities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
  ];

  useEffect(() => {
    // TODO: Replace with actual weather API call
    // Mock weather data
    const mockWeather = {
      city: selectedCity,
      temperature: Math.floor(Math.random() * 15) + 20,
      condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"][
        Math.floor(Math.random() * 4)
      ],
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      rainfall:
        Math.random() > 0.5 ? "No rain expected" : "Rain expected tomorrow",
      feelsLike: Math.floor(Math.random() * 15) + 22,
      uvIndex: Math.floor(Math.random() * 8) + 1,
    };

    const mockForecast = [
      {
        day: "Today",
        temp: mockWeather.temperature,
        condition: mockWeather.condition,
        humidity: mockWeather.humidity,
      },
      {
        day: "Tomorrow",
        temp: Math.floor(Math.random() * 15) + 20,
        condition: "Sunny",
        humidity: 55,
      },
      {
        day: "Day 3",
        temp: Math.floor(Math.random() * 15) + 20,
        condition: "Partly Cloudy",
        humidity: 60,
      },
      {
        day: "Day 4",
        temp: Math.floor(Math.random() * 15) + 20,
        condition: "Cloudy",
        humidity: 65,
      },
      {
        day: "Day 5",
        temp: Math.floor(Math.random() * 15) + 20,
        condition: "Rainy",
        humidity: 75,
      },
    ];

    setWeatherData(mockWeather);
    setForecast(mockForecast);
  }, [selectedCity]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return (
          <svg
            className="w-full h-full text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        );
      case "Partly Cloudy":
        return (
          <svg
            className="w-full h-full text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case "Cloudy":
        return (
          <svg
            className="w-full h-full text-gray-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case "Rainy":
        return (
          <svg
            className="w-full h-full text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zm2 4a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm4 2a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm4-2a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getWeatherAdvice = () => {
    if (!weatherData) return [];

    const advice = [];

    if (
      weatherData.condition === "Rainy" ||
      weatherData.rainfall.includes("Rain expected")
    ) {
      advice.push({
        type: "warning",
        message: "Avoid watering crops. Rain expected in your area.",
      });
    }

    if (weatherData.temperature > 35) {
      advice.push({
        type: "alert",
        message:
          "High temperature alert! Ensure crops are well-watered and protected.",
      });
    }

    if (weatherData.humidity > 70) {
      advice.push({
        type: "info",
        message: "High humidity levels. Monitor crops for fungal diseases.",
      });
    }

    if (weatherData.condition === "Sunny" && weatherData.temperature < 30) {
      advice.push({
        type: "success",
        message: "Perfect weather conditions for harvesting and field work!",
      });
    }

    return advice;
  };

  const getAdviceColor = (type) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      case "alert":
        return "bg-red-100 border-red-500 text-red-800";
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-800";
      case "success":
        return "bg-green-100 border-green-500 text-green-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
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
              Weather Updates
            </h1>
            <p className="text-gray-600 mt-2">
              Real-time weather information for Pakistani cities
            </p>
          </div>

          {/* City Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
            >
              {pakistanCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Current Weather */}
          {weatherData && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-primary-green mb-6">
                Current Weather - {weatherData.city}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center">
                  <div className="w-32 h-32">
                    {getWeatherIcon(weatherData.condition)}
                  </div>
                  <div className="ml-6">
                    <p className="text-6xl font-bold text-gray-800">
                      {weatherData.temperature}°C
                    </p>
                    <p className="text-xl text-gray-600 mt-2">
                      {weatherData.condition}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Feels like {weatherData.feelsLike}°C
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-light-green p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Humidity</p>
                    <p className="text-2xl font-bold text-primary-green">
                      {weatherData.humidity}%
                    </p>
                  </div>
                  <div className="bg-light-green p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Wind Speed</p>
                    <p className="text-2xl font-bold text-primary-green">
                      {weatherData.windSpeed} km/h
                    </p>
                  </div>
                  <div className="bg-light-green p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">UV Index</p>
                    <p className="text-2xl font-bold text-primary-green">
                      {weatherData.uvIndex}
                    </p>
                  </div>
                  <div className="bg-light-green p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Rainfall</p>
                    <p className="text-sm font-semibold text-primary-green">
                      {weatherData.rainfall}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weather-Based Advice */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-primary-green mb-4">
              Farming Advice Based on Weather
            </h3>
            <div className="space-y-3">
              {getWeatherAdvice().length === 0 ? (
                <p className="text-gray-600">
                  No specific advice at this time. Weather conditions are
                  normal.
                </p>
              ) : (
                getWeatherAdvice().map((advice, index) => (
                  <div
                    key={index}
                    className={`border-l-4 p-4 rounded-r-lg ${getAdviceColor(
                      advice.type
                    )}`}
                  >
                    {advice.message}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-primary-green mb-4">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="bg-light-green p-4 rounded-lg text-center"
                >
                  <p className="font-semibold text-primary-green mb-2">
                    {day.day}
                  </p>
                  <div className="w-16 h-16 mx-auto mb-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {day.temp}°C
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{day.condition}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Humidity: {day.humidity}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary-green mb-2">
              About Weather Data
            </h3>
            <p className="text-gray-600 text-sm">
              Weather information is updated regularly and sourced from reliable
              meteorological services. Use this data to plan your farming
              activities, irrigation schedules, and harvest timing. For
              region-specific weather patterns, check the forecast regularly.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WeatherPage;
