import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectFilterSidebar from "../components/Filters/ProjectFilterSidebar";
import ProjectList from "../components/ProjectList/ProjectList";
import { sampleProjects } from "../data/data";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  // State for fetched data and application status
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. DATA FETCHING (CONNECTING TO BACKEND) ---
  useEffect(() => {
    const fetchProjects = async () => {
      // Define the backend URL (assuming Spring Boot is on port 8080)
      const API_URL = '/api/v1/project/browse';

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const standardResponse = await response.json();
        
        // Assuming the actual project list is nested under the 'data' key 
        // in your StandardResponse structure.
        setProjects(standardResponse.data);
        setError(null);

      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please check the backend service.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Apply filters + search
  const filtered = projects.filter((p) => {
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

  // --- 3. RENDER UI ---
  
  if (loading) {
      return <div className="p-6 text-xl text-blue-600">Loading projects...</div>;
  }
  
  if (error) {
      return <div className="p-6 text-xl text-red-600">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Sidebar */}
      <ProjectFilterSidebar projects={projects} onFilter={setFilters} />

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
