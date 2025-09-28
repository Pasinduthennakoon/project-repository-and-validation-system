import { useState, useEffect } from "react";
import ProjectFilterSidebar from "./ProjectFilterSidebar";
import ProjectList from "./ProjectList";

export default function BrowseProjects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async (filters) => {
    // Build query string for backend API
    let query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/projects/filter?${query}`);
    const data = await res.json();
    setProjects(data);
  };

  // Load all projects on first render
  useEffect(() => {
    fetchProjects({});
  }, []);

  return (
    <div className="flex gap-6">
      <ProjectFilterSidebar onFilter={fetchProjects} />
      <ProjectList projects={projects} />
    </div>
  );
}
