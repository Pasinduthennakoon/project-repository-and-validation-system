import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProjectReviewCard from "../components/Lecturer/ProjectReviewCard";
import projectService from "../services/projectService";

const LecturerDashboard = () => {
  const { user } = useAuth();
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
            
            try {
                // 🎯 USE THE SECURE SERVICE METHOD
                const result = await projectService.fetchProjectsForReview(user.userId); 

                if (!result.ok) {
                    // result.message will contain the error from the service catch block
                    throw new Error(result.message); 
                }

                setProjects(result.data); // Set state with the successfully fetched data

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
      const data = {
        comment: comment,
        ratingStars: rating,
        project: projectId,
      };

      const result = await projectService.submitReview(user.userId, data);

      if (!result.ok) {
        throw new Error(result.message);
      }

      // Update project status in state
      setProjects((prev) => prev.filter((p) => p.projectId !== projectId));
      alert(
        result.message ||
          `Review submitted successfully for Project ID: ${projectId}`
      );
    } catch (err) {
      console.error("Error submitting review:", err);
      alert(`Failed to submit review. ${err.message}`);
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
  const departments = [
    ...new Set(projects.map((p) => p.department).filter(Boolean)),
  ];
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
