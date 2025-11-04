import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Layout from "../components/Layout";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceTrendsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [compareProduct, setCompareProduct] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockProducts = [
      {
        id: 1,
        name: "Tomato",
        currentPrice: 45,
        trend: [40, 42, 44, 43, 45, 46, 45],
        dates: [
          "May 29",
          "May 30",
          "May 31",
          "Jun 1",
          "Jun 2",
          "Jun 3",
          "Jun 4",
        ],
      },
      {
        id: 2,
        name: "Potato",
        currentPrice: 35,
        trend: [38, 37, 36, 35, 35, 34, 35],
        dates: [
          "May 29",
          "May 30",
          "May 31",
          "Jun 1",
          "Jun 2",
          "Jun 3",
          "Jun 4",
        ],
      },
      {
        id: 3,
        name: "Onion",
        currentPrice: 50,
        trend: [45, 46, 48, 49, 50, 51, 50],
        dates: [
          "May 29",
          "May 30",
          "May 31",
          "Jun 1",
          "Jun 2",
          "Jun 3",
          "Jun 4",
        ],
      },
      {
        id: 4,
        name: "Mango",
        currentPrice: 120,
        trend: [115, 118, 120, 122, 120, 119, 120],
        dates: [
          "May 29",
          "May 30",
          "May 31",
          "Jun 1",
          "Jun 2",
          "Jun 3",
          "Jun 4",
        ],
      },
      {
        id: 5,
        name: "Apple",
        currentPrice: 200,
        trend: [195, 198, 200, 200, 202, 201, 200],
        dates: [
          "May 29",
          "May 30",
          "May 31",
          "Jun 1",
          "Jun 2",
          "Jun 3",
          "Jun 4",
        ],
      },
    ];

    setProducts(mockProducts);

    // Check if product is passed in URL
    const productId = searchParams.get("product");
    if (productId) {
      const product = mockProducts.find((p) => p.id === parseInt(productId));
      if (product) setSelectedProduct(product);
    } else {
      setSelectedProduct(mockProducts[0]);
    }
  }, [searchParams]);

  const getChartData = () => {
    const datasets = [];

    if (selectedProduct) {
      datasets.push({
        label: selectedProduct.name,
        data: selectedProduct.trend,
        borderColor: "#00712D",
        backgroundColor: "rgba(0, 113, 45, 0.1)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#00712D",
      });
    }

    if (compareProduct) {
      datasets.push({
        label: compareProduct.name,
        data: compareProduct.trend,
        borderColor: "#FF9100",
        backgroundColor: "rgba(255, 145, 0, 0.1)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#FF9100",
      });
    }

    return {
      labels: selectedProduct?.dates || [],
      datasets,
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "7-Day Price Trend (Rs.)",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: Rs. ${context.parsed.y}/kg`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return "Rs. " + value;
          },
        },
      },
    },
  };

  const calculatePriceChange = (product) => {
    if (!product || product.trend.length < 2)
      return { change: 0, percentage: 0 };
    const lastPrice = product.trend[product.trend.length - 1];
    const firstPrice = product.trend[0];
    const change = lastPrice - firstPrice;
    const percentage = ((change / firstPrice) * 100).toFixed(1);
    return { change, percentage };
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
              Price Trends
            </h1>
            <p className="text-gray-600 mt-2">
              Analyze 7-day price trends and compare products
            </p>
          </div>

          {/* Product Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Product
                </label>
                <select
                  value={selectedProduct?.id || ""}
                  onChange={(e) => {
                    const product = products.find(
                      (p) => p.id === parseInt(e.target.value)
                    );
                    setSelectedProduct(product);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compare With (Optional)
                </label>
                <select
                  value={compareProduct?.id || ""}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setCompareProduct(null);
                    } else {
                      const product = products.find(
                        (p) => p.id === parseInt(e.target.value)
                      );
                      setCompareProduct(product);
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  <option value="">No Comparison</option>
                  {products
                    .filter((p) => p.id !== selectedProduct?.id)
                    .map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {selectedProduct && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-primary-green mb-4">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Price</p>
                    <p className="text-4xl font-bold text-primary-green">
                      Rs. {selectedProduct.currentPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">7-Day Change</p>
                    <p
                      className={`text-2xl font-bold ${
                        calculatePriceChange(selectedProduct).change >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {calculatePriceChange(selectedProduct).change >= 0
                        ? "+"
                        : ""}
                      {calculatePriceChange(selectedProduct).percentage}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {compareProduct && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-primary-yellow mb-4">
                  {compareProduct.name}
                </h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Price</p>
                    <p className="text-4xl font-bold text-primary-yellow">
                      Rs. {compareProduct.currentPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">7-Day Change</p>
                    <p
                      className={`text-2xl font-bold ${
                        calculatePriceChange(compareProduct).change >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {calculatePriceChange(compareProduct).change >= 0
                        ? "+"
                        : ""}
                      {calculatePriceChange(compareProduct).percentage}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div style={{ height: "400px" }}>
              <Line data={getChartData()} options={chartOptions} />
            </div>
          </div>

          {/* Insights */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-primary-green mb-4">
              Market Insights
            </h3>
            {selectedProduct && (
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary-green mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <p className="text-gray-700">
                    <strong>{selectedProduct.name}</strong> prices have{" "}
                    {calculatePriceChange(selectedProduct).change >= 0
                      ? "increased"
                      : "decreased"}{" "}
                    by{" "}
                    {Math.abs(calculatePriceChange(selectedProduct).percentage)}
                    % over the last 7 days.
                  </p>
                </div>
                {calculatePriceChange(selectedProduct).change > 0 && (
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-600 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-700">
                      Rising trend detected. Consider selling if you have stock.
                    </p>
                  </div>
                )}
                {compareProduct && (
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary-yellow mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-700">
                      Comparing with <strong>{compareProduct.name}</strong>:
                      Current price difference is Rs.{" "}
                      {Math.abs(
                        selectedProduct.currentPrice -
                          compareProduct.currentPrice
                      )}
                      .
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PriceTrendsPage;
