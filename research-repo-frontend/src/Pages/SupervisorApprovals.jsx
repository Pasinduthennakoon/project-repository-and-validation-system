import React, { useState } from "react";
import { pendingUploads } from "../data/pendingUploads";
import ProjectApprovalCard from "../components/Lecturer/ProjectApprovalCard";

const SupervisorApprovalsPage = () => {
  const [projects, setProjects] = useState(pendingUploads);

  // ✅ Replace this with actual logged-in supervisor later
  const loggedSupervisor = { name: "Dr. Silva" };

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
      <h1 className="text-3xl font-bold text-gray-700">Supervisor Approval Panel</h1>

      {projects.map((proj) => (
        <ProjectApprovalCard
          key={proj.id}
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
