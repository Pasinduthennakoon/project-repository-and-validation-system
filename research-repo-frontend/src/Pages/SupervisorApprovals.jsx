import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProjectApprovalCard from "../components/Lecturer/ProjectApprovalCard";
import pendingProjectService from "../services/pendingProjectService";

const SupervisorApprovalsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Data on Component Mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await pendingProjectService.fetchPendingProjects(
          user.userId
        );

        if (!result.ok) {
          throw new Error(result.message);
        }
        console.log("Fetched projects:", result.data); // Debug log
        setProjects(result.data || []); // Set state with fetched data
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load projects. Please try again later.");
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means it runs once on mount

  const handleApprove = async (id) => {
    try {
      const result = await pendingProjectService.approveProject(id);
      // console.log("Approval result:", result); // Debug log
      if (!result.ok) {
        throw new Error(result.message);
      }

      setProjects((prev) => prev.filter((p) => p.pendingProjectId !== id));
      alert(result.message);
    } catch (err) {
      console.error("Approval error:", err);
      alert(`Approval failed: ${err.message}`);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this project?")) {
      return;
    }

    try {
      const result = await pendingProjectService.rejectProject(id);
      if (!result.ok) {
        throw new Error(result.message);
      }

      setProjects((prev) => prev.filter((p) => p.pendingProjectId !== id));
      alert(result.message);
    } catch (err) {
      console.error("Rejection error:", err);
      alert(`Rejection failed: ${err.message}`);
    }
  };

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-3xl font-bold text-gray-700">
        Supervisor Approval Panel
      </h1>

      {isLoading && (
        <p className="text-blue-500">Loading pending projects...</p>
      )}

      {error && <p className="text-red-500">Error: {error}</p>}

      {!isLoading && projects.length === 0 && !error && (
        <p className="text-gray-500">
          No projects currently awaiting approval.
        </p>
      )}

      {projects.map((proj) => (
        <ProjectApprovalCard
          key={proj.pendingProjectId} // ⬅️ Updated to use proj.pendingProjectId
          project={proj}
          supervisor={{name: user?.name || "Loading..."}} // Pass supervisor name
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

export default SupervisorApprovalsPage;
