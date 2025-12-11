// src/components/cards/CommentCard.jsx
import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800">{comment.commenterName}</span>
        <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-700 mb-2">{comment.comment}</p>
      <div className="text-yellow-500">
        {"★".repeat(comment.ratingStars) + "☆".repeat(5 - comment.ratingStars)}
      </div>
    </div>
  );
};

export default CommentCard;
