import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "vegetable",
    price: "",
    unit: "kg",
    region: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call will be added here
    console.log("Product Data:", formData);
    alert("Product added successfully!");
    navigate("/admin/products");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-green py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/admin")}
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
              Add New Product
            </h1>
            <p className="text-gray-600 mt-2">
              Add vegetables or fruits to the market database
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="e.g., Tomato, Potato, Mango"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                >
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                </select>
              </div>

              {/* Price and Unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    placeholder="e.g., 45.00"
                  />
                </div>

                <div>
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Unit *
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    required
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  >
                    <option value="kg">Per Kg</option>
                    <option value="dozen">Per Dozen</option>
                    <option value="piece">Per Piece</option>
                    <option value="bundle">Per Bundle</option>
                  </select>
                </div>
              </div>

              {/* Region and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Region *
                  </label>
                  <select
                    id="region"
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  >
                    <option value="">Select Region</option>
                    <option value="karachi">Karachi</option>
                    <option value="lahore">Lahore</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="rawalpindi">Rawalpindi</option>
                    <option value="faisalabad">Faisalabad</option>
                    <option value="multan">Multan</option>
                    <option value="peshawar">Peshawar</option>
                    <option value="quetta">Quetta</option>
                    <option value="sialkot">Sialkot</option>
                    <option value="gujranwala">Gujranwala</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Stock Availability *
                  </label>
                  <select
                    id="stock"
                    name="stock"
                    required
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="in-stock">In Stock</option>
                    <option value="limited">Limited Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Add any additional information about the product..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-green text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProductPage;
