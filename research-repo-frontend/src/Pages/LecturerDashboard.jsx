import React, { useState, useEffect } from "react";
import ProjectReviewCard from "../components/Lecturer/ProjectReviewCard";

const LecturerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  // Fetches projects awaiting review from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      const API_URL = "/api/v1/project/comment/view_projects"; // Adjust path if needed

      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const responseData = await res.json();

        if (responseData.code !== 201) {
          throw new Error(responseData.message || "Failed to fetch projects.");
        }

        setProjects(responseData.data); // Set state with List<ProjectReviewResponseDTO>
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return <p className="p-10 text-gray-500">Loading projects for review...</p>;
  if (error)
    return <p className="p-10 text-red-600">Error loading data: {error}</p>;

  // Handle submit review
  const handleSubmitReview = async (projectId, comment, rating) => {
    try {
      // TODO: Make API call to submit review
      // const response = await fetch(`/api/v1/project/comment/${projectId}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ comment, rating })
      // });
      
      // Update project status in state
      setProjects((prev) =>
        prev.map((p) =>
          p.projectId === projectId ? { ...p, status: "REVIEWED", comment, rating } : p
        )
      );
      
      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((proj) => {
    return (
      (departmentFilter ? proj.department === departmentFilter : true) &&
      (batchFilter ? proj.batch === batchFilter : true)
    );
  });

  // Unique departments and batches for dropdowns - use fetched projects instead of sampleProjects
  const departments = [...new Set(projects.map((p) => p.department).filter(Boolean))];
  const batches = [...new Set(projects.map((p) => p.batch).filter(Boolean))];

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
              key={proj.projectId || proj.id}
              project={proj}
              onSubmitReview={handleSubmitReview}
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
