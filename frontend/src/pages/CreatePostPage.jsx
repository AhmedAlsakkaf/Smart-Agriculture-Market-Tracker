import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 20) {
      newErrors.content = "Content must be at least 20 characters";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // TODO: Replace with actual API call
    console.log("Creating post:", formData);

    // Simulate API call
    setTimeout(() => {
      alert("Post created successfully!");
      navigate("/farmer/forum");
    }, 500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-green py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/farmer/forum")}
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
              Back to Forum
            </button>
            <h1 className="text-4xl font-bold text-primary-green">
              Create New Post
            </h1>
            <p className="text-gray-600 mt-2">
              Share your knowledge, ask questions, or start a discussion
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Post Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a descriptive title for your post"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="general">General Discussion</option>
                  <option value="farming">Farming Tips</option>
                  <option value="market">Market Prices</option>
                  <option value="problem">Problems & Solutions</option>
                  <option value="weather">Weather</option>
                  <option value="success">Success Stories</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Content */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your post content here. Be as detailed as possible to help other farmers..."
                  rows="10"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent ${
                    errors.content ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  {formData.content.length} characters (minimum 20 required)
                </p>
              </div>

              {/* Guidelines */}
              <div className="mb-6 bg-light-green p-4 rounded-lg border-l-4 border-primary-green">
                <h3 className="font-semibold text-primary-green mb-2">
                  Posting Guidelines
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Be respectful and courteous to other farmers</li>
                  <li>• Provide accurate and helpful information</li>
                  <li>• Use clear and descriptive titles</li>
                  <li>
                    • Include relevant details about your location and crop type
                    when applicable
                  </li>
                  <li>• Avoid sharing personal contact information publicly</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/farmer/forum")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-green text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-primary-green mb-3">
              Tips for Creating Engaging Posts
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Choose the Right Category:</strong> Selecting the
                correct category helps other farmers find your post more easily.
              </p>
              <p>
                <strong>Write Descriptive Titles:</strong> A good title
                summarizes your post and attracts readers. Example: "Best
                Irrigation Methods for Wheat in Punjab" instead of just
                "Irrigation Help".
              </p>
              <p>
                <strong>Provide Context:</strong> Include details like your
                location, crop type, farm size, and specific conditions to get
                more relevant responses.
              </p>
              <p>
                <strong>Use Clear Language:</strong> Write in simple, clear
                language that all farmers can understand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePostPage;
