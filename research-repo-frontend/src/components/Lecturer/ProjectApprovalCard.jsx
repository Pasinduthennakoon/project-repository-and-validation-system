import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectApprovalCard = ({ project, supervisor, onApprove, onReject }) => {
  const navigate = useNavigate();

  // 1. Data Mapping Adjustments:
  // Since the DTO is flat, we map the fields directly:
  const studentRegNo = project.regNo; // Used regNo from DTO
  const projectSupervisor =
    project.supervisors?.[0] || { name: project.supervisorName, email: project.supervisorEmail };

  // ... (filtering logic remains the same)

  // 2. Abstract Field Name Adjustment:
  const shortDescription =
    project.description?.length > 200 // ⬅️ Use abstract_ from DTO
      ? project.description.substring(0, 200) + "..."
      : project.description;

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">

        <h2 className="text-xl font-semibold text-blue-700">{project.title}</h2>

      </div>
      <p className="text-sm text-gray-700 mb-1">
        {/* 3. Use DTO fields for display: */}
        <strong>Reg:</strong> {studentRegNo} | <strong>Department:</strong> {project.department} | <strong>Batch:</strong> {project.batch}
      </p>
      <p className="text-sm text-gray-500 mb-3">
        <strong>Created:</strong> {project.createdAt} {/* ⬅️ Use createdAt */}
      </p>

      {/* 4. Abstract rendering: */}
      {project.description && ( // ⬅️ Check abstract_
        <p className="text-gray-700 text-sm mb-4">
          <strong>Description:</strong> {shortDescription}
        </p>
      )}

      <div className="flex gap-4">
        {/* 5. Pass pendingProjectId to the handlers: */}
        <button
          onClick={() => onApprove(project.pendingProjectId)} // ⬅️ Use pendingProjectId
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(project.pendingProjectId)} // ⬅️ Use pendingProjectId
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ProjectApprovalCard;
