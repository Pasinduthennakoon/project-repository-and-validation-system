import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectFilterSidebar from "../components/Filters/ProjectFilterSidebar";
import ProjectList from "../components/ProjectList/ProjectList";
import { sampleProjects } from "../data/data";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  // Apply filters + search
  const filtered = sampleProjects.filter((p) => {
    // General search bar (title, department, batch)
    const matchQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.department.toLowerCase().includes(query.toLowerCase()) ||
      p.batch.toString().includes(query);

    // Department filter
    const matchDepartment =
      !filters.department || p.department === filters.department;

    // Batch filter
    const matchBatch = !filters.batch || p.batch === filters.batch;

    // Keywords filter (search inside title + abstract)
    const matchKeywords =
      !filters.keywords ||
      p.title.toLowerCase().includes(filters.keywords.toLowerCase()) ||
      (p.abstract && p.abstract.toLowerCase().includes(filters.keywords.toLowerCase()));

    // Tags filter (case-insensitive)
    const matchTags =
      !filters.tags || filters.tags.length === 0 ||
      filters.tags.every(tag =>
        p.tags?.some(pt => pt.toLowerCase().includes(tag.toLowerCase().trim()))
      );

    return matchQuery && matchDepartment && matchBatch && matchKeywords && matchTags;
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Sidebar */}
      <ProjectFilterSidebar projects={sampleProjects} onFilter={setFilters} />

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
      </div>
    </div>
  );
};

export default Projects;
