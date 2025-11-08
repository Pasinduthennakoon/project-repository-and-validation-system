import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Rate } from "antd";

const ProjectReviewCard = ({ project, onSubmitReview }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const student = project.students?.[0];

  const handleSubmitReview = () => {
    if (!comment || rating === 0) {
      alert("Please provide both rating and comment before submitting.");
      return;
    }
    onSubmitReview(project.id, comment, rating);
    alert("Review submitted successfully!");
    setComment("");
    setRating(0);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-semibold text-blue-700">
          {project.title}
        </h2>
        <Link
          to={`/projects/${project.id}`} // match your route
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          View Project →
        </Link>

      </div>

      <div className="text-sm text-gray-600 mb-3">
        <p>
          <strong>Student:</strong> {student?.name} |{" "}
          <strong>Department:</strong> {project.department} |{" "}
          <strong>Batch:</strong> {project.batch}
        </p>
        <p>
          <strong>Created:</strong> {project.created}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <Rate onChange={setRating} value={rating} className="mb-3" />


        <label className="block text-gray-700 font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="border rounded-lg px-3 py-2 w-full"
          rows="2"
        />

        <button
          onClick={handleSubmitReview}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProjectReviewCard;
