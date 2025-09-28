import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectFilterSidebar from "../components/Filters/ProjectFilterSidebar";
import ProjectList from "../components/ProjectList/ProjectList";

const sampleProjects = [
  { id: 1, title: "AI-Powered LMS", department: "CS", batch: "2025" },
  { id: 2, title: "Blockchain Voting", department: "IT", batch: "2024" },
  { id: 3, title: "IoT Smart Farming", department: "CS", batch: "2024" },
];

const Projects = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  // Apply filters + search
  const filtered = sampleProjects.filter((p) => {
    const matchQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.department.toLowerCase().includes(query.toLowerCase()) ||
      p.batch.includes(query);

    const matchDepartment =
      !filters.department || p.department === filters.department;

    const matchBatch = !filters.batch || p.batch === filters.batch;

    return matchQuery && matchDepartment && matchBatch;
  });

  return (
    <div className="flex gap-6 p-6">
      {/* Sidebar */}
      <ProjectFilterSidebar onFilter={setFilters} />

      {/* Main Content */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Browse Projects</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title, department, batch..."
          className="border rounded px-3 py-2 w-full mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Project List */}
        <ProjectList projects={filtered} />

        {/* OR inline list if you don’t want a separate component */}
        {/* 
        <ul className="space-y-3">
          {filtered.map((project) => (
            <li
              key={project.id}
              className="bg-white shadow rounded p-4"
            >
              <Link
                to={`/projects/${project.id}`}
                className="text-blue-600 font-semibold"
              >
                {project.title}
              </Link>
              <p className="text-sm text-gray-500">
                {project.department} | Batch {project.batch}
              </p>
            </li>
          ))}
        </ul>
        */}
      </div>
    </div>
  );
};

export default Projects;
