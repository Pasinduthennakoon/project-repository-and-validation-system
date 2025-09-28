import React from "react";
import { useParams } from "react-router-dom";

const sampleProjects = [
  { id: 1, title: "AI-Powered LMS", department: "CS", batch: "2025", abstract: "Analyze student performance with AI.", tags: ["AI", "LMS"] },
  { id: 2, title: "Blockchain Voting", department: "IT", batch: "2024", abstract: "Secure voting system using blockchain.", tags: ["Blockchain", "Voting"] },
  { id: 3, title: "IoT Smart Farming", department: "CS", batch: "2024", abstract: "Monitor crops using IoT devices.", tags: ["IoT", "Farming"] },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = sampleProjects.find(p => p.id === parseInt(id));

  if (!project) return <p className="p-4 text-gray-500">Project not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{project.title}</h2>
      <p className="text-sm text-gray-600">{project.department} | Batch {project.batch}</p>
      <p className="mt-4">{project.abstract}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
