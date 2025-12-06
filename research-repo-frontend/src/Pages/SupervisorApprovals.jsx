import React, { useState, useEffect } from "react";
import ProjectApprovalCard from "../components/Lecturer/ProjectApprovalCard";

const SupervisorApprovalsPage = () => {
  const [projects, setProjects] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Replace this with actual logged-in supervisor later
  const loggedSupervisor = { name: "Dr. Silva" };

  // 1. Fetch Data on Component Mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "/api/v1/pending_projects/view" // ⬅️ Replace with your actual backend URL
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const jsonResponse = await response.json();

        // 2. Set the data from the 'payload' field of StandardResponse
        // The data fetched here will match the PendingProjectApprovelResponseDTO structure.
        setProjects(jsonResponse.data || []);
        setError(null);

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

  const handleApprove = (id) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "APPROVED" } : p))
    );
    alert("Project approved successfully!");
  };

  const handleReject = (id) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "REJECTED" } : p))
    );
    alert("Project rejected.");
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
      <p className="text-gray-500">No projects currently awaiting approval.</p>
    )}

    {projects.map((proj) => (
      <ProjectApprovalCard
        key={proj.pendingProjectId} // ⬅️ Updated to use proj.pendingProjectId
        project={proj}
        supervisor={loggedSupervisor}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    ))}
  </div>
  );
};

export default SupervisorApprovalsPage;
