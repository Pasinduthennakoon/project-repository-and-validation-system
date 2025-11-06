import React, { useState } from "react";
import { sampleProjects } from "../data/data";
import ProjectReviewCard from "../components/Lecturer/ProjectReviewCard";

const LecturerDashboard = () => {
  const [projects, setProjects] = useState(sampleProjects || []);

  const handleAction = (id, action, comment, rating) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: action === "approve" ? "APPROVED" : "REJECTED",
              comment,
              rating,
            }
          : p
      )
    );
  };

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-700">
        Lecturer Project Review Panel
      </h1>
      {projects.map((proj) => (
        <ProjectReviewCard
          key={proj.id}
          project={proj}
          onAction={handleAction}
        />
      ))}
    </div>
  );
};

export default LecturerDashboard;
