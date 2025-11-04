import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const MarketRatesPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockProducts = [
      {
        id: 1,
        name: "Tomato",
        category: "vegetable",
        price: 45,
        unit: "kg",
        region: "Karachi",
        lastUpdated: "2 hours ago",
      },
      {
        id: 2,
        name: "Potato",
        category: "vegetable",
        price: 35,
        unit: "kg",
        region: "Lahore",
        lastUpdated: "3 hours ago",
      },
      {
        id: 3,
        name: "Onion",
        category: "vegetable",
        price: 50,
        unit: "kg",
        region: "Islamabad",
        lastUpdated: "1 hour ago",
      },
      {
        id: 4,
        name: "Mango",
        category: "fruit",
        price: 120,
        unit: "kg",
        region: "Multan",
        lastUpdated: "5 hours ago",
      },
      {
        id: 5,
        name: "Apple",
        category: "fruit",
        price: 200,
        unit: "kg",
        region: "Quetta",
        lastUpdated: "4 hours ago",
      },
      {
        id: 6,
        name: "Carrot",
        category: "vegetable",
        price: 40,
        unit: "kg",
        region: "Faisalabad",
        lastUpdated: "2 hours ago",
      },
      {
        id: 7,
        name: "Cucumber",
        category: "vegetable",
        price: 30,
        unit: "kg",
        region: "Karachi",
        lastUpdated: "1 hour ago",
      },
      {
        id: 8,
        name: "Banana",
        category: "fruit",
        price: 80,
        unit: "dozen",
        region: "Lahore",
        lastUpdated: "3 hours ago",
      },
      {
        id: 9,
        name: "Orange",
        category: "fruit",
        price: 150,
        unit: "kg",
        region: "Islamabad",
        lastUpdated: "2 hours ago",
      },
      {
        id: 10,
        name: "Spinach",
        category: "vegetable",
        price: 25,
        unit: "bundle",
        region: "Rawalpindi",
        lastUpdated: "4 hours ago",
      },
    ];
    setProducts(mockProducts);
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    const matchesRegion =
      filterRegion === "all" ||
      product.region.toLowerCase() === filterRegion.toLowerCase();
    return matchesSearch && matchesCategory && matchesRegion;
  });

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
              Current Market Rates
            </h1>
            <p className="text-gray-600 mt-2">
              View up-to-date prices of vegetables and fruits across Pakistan
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  <option value="all">All Categories</option>
                  <option value="vegetable">Vegetables</option>
                  <option value="fruit">Fruits</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Region
                </label>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  <option value="all">All Regions</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="rawalpindi">Rawalpindi</option>
                  <option value="faisalabad">Faisalabad</option>
                  <option value="multan">Multan</option>
                  <option value="peshawar">Peshawar</option>
                  <option value="quetta">Quetta</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
                No products found
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary-green">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {product.category}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/farmer/price-trends?product=${product.id}`)
                      }
                      className="text-primary-green hover:text-opacity-80"
                      title="View Price Trend"
                    >
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
                    </button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600">Current Price:</span>
                      <span className="text-3xl font-bold text-primary-green">
                        Rs. {product.price}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      Per {product.unit}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        <svg
                          className="w-4 h-4 inline mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {product.region}
                      </span>
                      <span className="text-gray-400">
                        Updated {product.lastUpdated}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/farmer/price-trends?product=${product.id}`)
                    }
                    className="w-full mt-4 bg-light-green text-primary-green py-2 rounded-lg font-semibold hover:bg-primary-green hover:text-white transition"
                  >
                    View 7-Day Trend
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-primary-green mb-3">
              About Market Rates
            </h3>
            <p className="text-gray-600">
              Market rates are updated regularly by our admin team based on
              real-time market data. Prices may vary across different regions
              and markets. Use this information as a guide for making informed
              selling decisions. For detailed price history and trends, click on
              "View 7-Day Trend" for any product.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketRatesPage;
