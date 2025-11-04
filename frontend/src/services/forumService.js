import { authenticatedFetch } from "./authService";

const API_BASE_URL = "http://localhost:5000/api"; // TODO: Update with your backend URL

/**
 * Forum Service
 * Handles all forum-related API calls (posts and comments)
 */

// ==================== POST OPERATIONS ====================

/**
 * Get all forum posts
 * @param {Object} filters - Optional filters (category, search)
 * @returns {Promise<Array>} Array of forum posts
 */
export const getAllPosts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.search) queryParams.append("search", filters.search);

    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/posts?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

/**
 * Get a single forum post by ID
 * @param {number} postId - Post ID
 * @returns {Promise<Object>} Forum post with details
 */
export const getPostById = async (postId) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/posts/${postId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

/**
 * Get posts by current user
 * @returns {Promise<Array>} Array of user's forum posts
 */
export const getMyPosts = async () => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/forum/my-posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch user posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};

/**
 * Create a new forum post
 * @param {Object} postData - Post data (title, content, category)
 * @returns {Promise<Object>} Created post
 */
export const createPost = async (postData) => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/forum/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

/**
 * Update a forum post
 * @param {number} postId - Post ID
 * @param {Object} postData - Updated post data
 * @returns {Promise<Object>} Updated post
 */
export const updatePost = async (postId, postData) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

/**
 * Delete a forum post
 * @param {number} postId - Post ID
 * @returns {Promise<Object>} Success message
 */
export const deletePost = async (postId) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/posts/${postId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

/**
 * Like/unlike a forum post
 * @param {number} postId - Post ID
 * @returns {Promise<Object>} Updated post with new like count
 */
export const toggleLikePost = async (postId) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/posts/${postId}/like`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle like");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

// ==================== COMMENT OPERATIONS ====================

/**
 * Get all comments for a post
 * @param {number} postId - Post ID
 * @returns {Promise<Array>} Array of comments
 */
export const getCommentsByPostId = async (postId) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/posts/${postId}/comments`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

/**
 * Add a comment to a post
 * @param {number} postId - Post ID
 * @param {Object} commentData - Comment data (content)
 * @returns {Promise<Object>} Created comment
 */
export const addComment = async (postId, commentData) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add comment");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

/**
 * Update a comment
 * @param {number} commentId - Comment ID
 * @param {Object} commentData - Updated comment data
 * @returns {Promise<Object>} Updated comment
 */
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update comment");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

/**
 * Delete a comment
 * @param {number} commentId - Comment ID
 * @returns {Promise<Object>} Success message
 */
export const deleteComment = async (commentId) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

// ==================== FORUM STATISTICS ====================

/**
 * Get forum statistics for a user
 * @returns {Promise<Object>} User's forum statistics
 */
export const getUserForumStats = async () => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/forum/stats`);

    if (!response.ok) {
      throw new Error("Failed to fetch forum statistics");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forum statistics:", error);
    throw error;
  }
};

/**
 * Get trending posts
 * @param {number} limit - Number of posts to fetch (default: 10)
 * @returns {Promise<Array>} Array of trending posts
 */
export const getTrendingPosts = async (limit = 10) => {
  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/forum/trending?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trending posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    throw error;
  }
};
