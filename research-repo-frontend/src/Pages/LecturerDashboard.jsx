import React, { useState } from "react";
import { sampleProjects } from "../data/data";
import ProjectReviewCard from "../components/Lecturer/ProjectReviewCard";

const LecturerDashboard = () => {
  const [projects, setProjects] = useState(sampleProjects);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  // Handle approve/reject actions
  const handleAction = (id, action, comment, rating) => {
    if (action === "approve") {
      // Update project status in state
      setProjects((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "APPROVED", comment, rating } : p
        )
      );
    } else {
      // Remove rejected project from view
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((proj) => {
    return (
      (departmentFilter ? proj.department === departmentFilter : true) &&
      (batchFilter ? proj.batch === batchFilter : true)
    );
  });

  // Unique departments and batches for dropdowns
  const departments = [...new Set(sampleProjects.map((p) => p.department))];
  const batches = [...new Set(sampleProjects.map((p) => p.batch))];

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-700">
        Lecturer Project Review Panel
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Batches</option>
          {batches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setDepartmentFilter("");
            setBatchFilter("");
          }}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => (
            <ProjectReviewCard
              key={proj.id}
              project={proj}
              onAction={handleAction}
            />
          ))
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default LecturerDashboard;
