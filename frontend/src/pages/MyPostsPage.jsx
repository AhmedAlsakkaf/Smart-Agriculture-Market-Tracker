import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const MyPostsPage = () => {
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  // Mock current user
  const currentUser = "Hassan Raza"; // TODO: Get from authentication context

  useEffect(() => {
    // TODO: Replace with actual API call to get current user's posts
    const mockMyPosts = [
      {
        id: 3,
        title: "Dealing with Pest Infestation in Cotton Fields",
        content:
          "My cotton crops are facing pest issues. Has anyone dealt with this? What solutions worked for you?",
        category: "problem",
        likes: 31,
        comments: 15,
        views: 203,
        date: "1 day ago",
        status: "active",
      },
      {
        id: 8,
        title: "Best Fertilizer for Rice Crop",
        content:
          "I am looking for recommendations on the best organic fertilizers for rice crops in the monsoon season.",
        category: "farming",
        likes: 12,
        comments: 7,
        views: 89,
        date: "3 days ago",
        status: "active",
      },
      {
        id: 12,
        title: "Crop Rotation Benefits",
        content:
          "I have been practicing crop rotation for the past 2 years and the results have been amazing. Let me share my experience...",
        category: "success",
        likes: 45,
        comments: 23,
        views: 312,
        date: "1 week ago",
        status: "active",
      },
    ];

    setMyPosts(mockMyPosts);
  }, []);

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

  const handleEditPost = (post) => {
    setEditingPost(post);
    setEditFormData({
      title: post.title,
      content: post.content,
      category: post.category,
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    if (!editFormData.title.trim() || !editFormData.content.trim()) {
      alert("Title and content are required");
      return;
    }

    // TODO: Replace with actual API call
    setMyPosts(
      myPosts.map((post) =>
        post.id === editingPost.id
          ? { ...post, ...editFormData, date: "Edited just now" }
          : post
      )
    );

    setShowEditModal(false);
    setEditingPost(null);
    alert("Post updated successfully!");
  };

  const handleDeletePost = (postId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      // TODO: Replace with actual API call
      setMyPosts(myPosts.filter((post) => post.id !== postId));
      alert("Post deleted successfully!");
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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-primary-green">
                  My Posts
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your forum posts and track engagement
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
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Posts</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {myPosts.length}
                  </p>
                </div>
                <svg
                  className="w-10 h-10 text-primary-green"
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
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {myPosts.reduce((sum, post) => sum + post.views, 0)}
                  </p>
                </div>
                <svg
                  className="w-10 h-10 text-blue-500"
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
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Likes</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {myPosts.reduce((sum, post) => sum + post.likes, 0)}
                  </p>
                </div>
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Comments</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {myPosts.reduce((sum, post) => sum + post.comments, 0)}
                  </p>
                </div>
                <svg
                  className="w-10 h-10 text-primary-yellow"
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
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {myPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h2
                          className="text-2xl font-bold text-primary-green hover:text-opacity-80 cursor-pointer"
                          onClick={() => handleViewPost(post.id)}
                        >
                          {post.title}
                        </h2>
                        <span
                          className={`${getCategoryColor(
                            post.category
                          )} px-3 py-1 rounded-full text-xs font-semibold uppercase`}
                        >
                          {post.category}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
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
                      <span>{post.date}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewPost(post.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditPost(post)}
                        className="px-4 py-2 bg-primary-yellow text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {myPosts.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">
                You haven't created any posts yet
              </p>
              <button
                onClick={() => navigate("/farmer/forum/create")}
                className="bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Create Your First Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Post Modal */}
      {showEditModal && editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-primary-green mb-4">
              Edit Post
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                >
                  <option value="general">General Discussion</option>
                  <option value="farming">Farming Tips</option>
                  <option value="market">Market Prices</option>
                  <option value="problem">Problems & Solutions</option>
                  <option value="weather">Weather</option>
                  <option value="success">Success Stories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={editFormData.content}
                  onChange={handleEditFormChange}
                  rows="10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-primary-green text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MyPostsPage;
