import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ForumPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockPosts = [
      {
        id: 1,
        title: "Best Practices for Tomato Farming in Summer",
        content:
          "I have been growing tomatoes for 5 years now. Here are some tips I learned...",
        author: "Ahmed Khan",
        category: "farming",
        likes: 24,
        comments: 12,
        views: 156,
        date: "2 hours ago",
      },
      {
        id: 2,
        title: "Where to get best prices for wheat in Lahore?",
        content:
          "I am looking for reliable markets in Lahore that offer good prices for wheat. Any recommendations?",
        author: "Fatima Ali",
        category: "market",
        likes: 18,
        comments: 8,
        views: 89,
        date: "5 hours ago",
      },
      {
        id: 3,
        title: "Dealing with Pest Infestation in Cotton Fields",
        content:
          "My cotton crops are facing pest issues. Has anyone dealt with this? What solutions worked for you?",
        author: "Hassan Raza",
        category: "problem",
        likes: 31,
        comments: 15,
        views: 203,
        date: "1 day ago",
      },
      {
        id: 4,
        title: "Government Subsidy for Organic Farming",
        content:
          "Does anyone know about the new government subsidy program for organic farmers? How to apply?",
        author: "Sara Malik",
        category: "general",
        likes: 45,
        comments: 22,
        views: 312,
        date: "1 day ago",
      },
      {
        id: 5,
        title: "Rain Expected Next Week - Should I delay planting?",
        content:
          "Weather forecast shows heavy rain next week. I was planning to plant my crops. Should I wait?",
        author: "Usman Sheikh",
        category: "weather",
        likes: 12,
        comments: 6,
        views: 67,
        date: "3 hours ago",
      },
      {
        id: 6,
        title: "Success Story: Doubled My Yield with Drip Irrigation",
        content:
          "I installed a drip irrigation system last season and my yield increased by 95%. Here is my experience...",
        author: "Bilal Ahmed",
        category: "success",
        likes: 89,
        comments: 34,
        views: 521,
        date: "2 days ago",
      },
    ];

    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "farming":
        return "bg-primary-green text-white";
      case "market":
        return "bg-primary-yellow text-white";
      case "problem":
        return "bg-red-500 text-white";
      case "weather":
        return "bg-blue-500 text-white";
      case "success":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleViewPost = (postId) => {
    navigate(`/farmer/forum/${postId}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-green py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
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
                Community Forum
              </h1>
              <p className="text-gray-600 mt-2">
                Connect with fellow farmers, share experiences, and get advice
              </p>
            </div>
            <button
              onClick={() => navigate("/farmer/forum/create")}
              className="bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Post
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Posts
                </label>
                <input
                  type="text"
                  placeholder="Search by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="farming">Farming Tips</option>
                  <option value="market">Market Prices</option>
                  <option value="problem">Problems & Solutions</option>
                  <option value="weather">Weather</option>
                  <option value="success">Success Stories</option>
                  <option value="general">General Discussion</option>
                </select>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleViewPost(post.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-2xl font-bold text-primary-green hover:text-opacity-80 flex-grow">
                      {post.title}
                    </h2>
                    <span
                      className={`${getCategoryColor(
                        post.category
                      )} px-3 py-1 rounded-full text-xs font-semibold uppercase ml-4`}
                    >
                      {post.category}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-primary-green">
                        {post.author}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {post.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No posts found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForumPage;
