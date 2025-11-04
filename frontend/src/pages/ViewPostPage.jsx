import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ViewPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  // Mock current user
  const currentUser = "Hassan Raza"; // TODO: Get from authentication context

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockPost = {
      id: parseInt(id),
      title: "Best Practices for Tomato Farming in Summer",
      content: `I have been growing tomatoes for 5 years now and I've learned a lot through trial and error. 
      
Here are some key tips that have helped me increase my yield significantly:

1. **Soil Preparation**: Always use well-drained soil mixed with organic compost. Tomatoes thrive in slightly acidic soil (pH 6.0-6.8).

2. **Watering Schedule**: Water deeply but less frequently. I water my tomato plants early in the morning, about 2-3 times per week depending on the weather.

3. **Mulching**: Apply a 2-3 inch layer of organic mulch around the plants. This helps retain moisture and keeps the roots cool.

4. **Support Structures**: Use stakes or cages to support your plants as they grow. This prevents the fruit from touching the ground.

5. **Pruning**: Remove the lower leaves and suckers to improve air circulation and direct energy to fruit production.

6. **Pest Control**: Regular inspection is key. I use neem oil spray as a preventive measure against common pests.

7. **Fertilization**: Apply balanced fertilizer every 2-3 weeks during the growing season.

These practices have helped me achieve consistent yields even during hot summer months. Feel free to ask if you have any questions!`,
      author: "Ahmed Khan",
      category: "farming",
      likes: 24,
      commentsCount: 12,
      views: 156,
      date: "2 hours ago",
    };

    const mockComments = [
      {
        id: 1,
        author: "Fatima Ali",
        content:
          "This is really helpful! I had no idea about the pH level requirement. Thank you for sharing!",
        date: "1 hour ago",
      },
      {
        id: 2,
        author: "Hassan Raza",
        content:
          "Great tips! I especially agree with the watering schedule. Overwatering is a common mistake many new farmers make.",
        date: "1 hour ago",
      },
      {
        id: 3,
        author: "Bilal Ahmed",
        content:
          "What type of mulch do you recommend? I have tried grass clippings but they attract pests.",
        date: "45 minutes ago",
      },
      {
        id: 4,
        author: "Sara Malik",
        content:
          "Excellent guide! Could you share more details about the fertilizer ratio you use?",
        date: "30 minutes ago",
      },
    ];

    setPost(mockPost);
    setComments(mockComments);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (post) {
      setPost({
        ...post,
        likes: isLiked ? post.likes - 1 : post.likes + 1,
      });
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Please write a comment");
      return;
    }

    // TODO: Replace with actual API call
    const comment = {
      id: comments.length + 1,
      author: currentUser,
      content: newComment,
      date: "Just now",
    };

    setComments([...comments, comment]);
    setNewComment("");

    if (post) {
      setPost({
        ...post,
        commentsCount: post.commentsCount + 1,
      });
    }
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentText(comment.content);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editCommentText.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    // TODO: Replace with actual API call
    setComments(
      comments.map((c) =>
        c.id === editCommentId
          ? { ...c, content: editCommentText, date: "Edited just now" }
          : c
      )
    );

    setShowEditModal(false);
    setEditCommentId(null);
    setEditCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      // TODO: Replace with actual API call
      setComments(comments.filter((c) => c.id !== commentId));

      if (post) {
        setPost({
          ...post,
          commentsCount: post.commentsCount - 1,
        });
      }
    }
  };

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

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen bg-light-green py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500">Loading post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-light-green py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate("/farmer/forum")}
            className="flex items-center text-primary-green hover:text-opacity-80 mb-6"
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

          {/* Post Content */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-primary-green flex-grow">
                {post.title}
              </h1>
              <span
                className={`${getCategoryColor(
                  post.category
                )} px-3 py-1 rounded-full text-xs font-semibold uppercase ml-4`}
              >
                {post.category}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
              <span className="font-semibold text-primary-green">
                {post.author}
              </span>
              <span>{post.date}</span>
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
                {post.views} views
              </span>
            </div>

            <div className="prose max-w-none mb-6">
              {post.content.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 mb-4 whitespace-pre-wrap"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-6 border-t">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {post.likes} Likes
              </button>
              <span className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
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
                {post.commentsCount} Comments
              </span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary-green mb-4">
              Comments ({comments.length})
            </h2>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent mb-2"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-green text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-semibold text-primary-green">
                        {comment.author}
                      </span>
                      <span className="text-sm text-gray-500 ml-3">
                        {comment.date}
                      </span>
                    </div>
                    {comment.author === currentUser && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditComment(comment)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>

            {comments.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Comment Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-2xl font-bold text-primary-green mb-4">
              Edit Comment
            </h3>
            <textarea
              value={editCommentText}
              onChange={(e) => setEditCommentText(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent mb-4"
            />
            <div className="flex justify-end gap-4">
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

export default ViewPostPage;
