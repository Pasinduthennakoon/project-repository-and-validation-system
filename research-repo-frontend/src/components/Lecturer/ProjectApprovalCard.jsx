import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectApprovalCard = ({ project, supervisor, onApprove, onReject }) => {
  const navigate = useNavigate();
  const student = project.students?.[0] || project.student;
  const projectSupervisor =
    project.supervisors?.[0] || { name: project.supervisorName, email: project.supervisorEmail };

  // ✅ Only show projects supervised by logged-in supervisor
  if (!projectSupervisor || projectSupervisor.name !== supervisor?.name) return null;

  // ✅ Limit abstract to first 200 characters for preview
  const shortAbstract =
    project.abstract?.length > 200
      ? project.abstract.substring(0, 200) + "..."
      : project.abstract;

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-semibold text-blue-700">{project.title}</h2>
      </div>

      <p className="text-sm text-gray-700 mb-1">
        <strong>Student:</strong> {student?.name} | <strong>Reg:</strong> {student?.reg} | <strong>Department:</strong> {project.department} | <strong>Batch:</strong> {project.batch}
      </p>
      <p className="text-sm text-gray-500 mb-3">
        <strong>Created:</strong> {project.created}
      </p>

      {/* ✅ Abstract Section */}
      {project.abstract && (
        <p className="text-gray-700 text-sm mb-4">
          <strong>Abstract:</strong> {shortAbstract}
        </p>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => onApprove(project.id)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(project.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ProjectApprovalCard;
