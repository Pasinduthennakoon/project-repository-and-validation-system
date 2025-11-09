import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import RecentProjectsTable from "../components/admin/RecentProjectsTable";
import { sampleProjects } from "../data/data";

const RecentProjectsPage = () => {
  const { user } = useAuth?.() || {};
  const currentUser = {
    role: user?.role || "admin",
    department: user?.department || null,
    name: user?.name || "Admin User",
  };

  const [deptFilter, setDeptFilter] = useState(
    currentUser.role === "supervisor" ? currentUser.department : ""
  );
  const [batchFilter, setBatchFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");

  // 🔹 Generate dynamic filter options
  const departments = useMemo(
    () => [...new Set(sampleProjects.map((p) => p.department))],
    []
  );

  const batches = useMemo(() => [...new Set(sampleProjects.map((p) => p.batch))], []);
  const tags = useMemo(
    () => [...new Set(sampleProjects.flatMap((p) => p.tags))].sort(),
    []
  );

  // 🔹 Filter projects
  const filteredProjects = useMemo(() => {
    return sampleProjects.filter((p) => {
      // Department filter
      const matchesDept =
        deptFilter === "" ||
        p.department.toLowerCase() === deptFilter.toLowerCase();

      // Batch filter
      const matchesBatch = batchFilter === "All" || p.batch === batchFilter;

      // Tag filter
      const matchesTag = tagFilter === "All" || p.tags.includes(tagFilter);

      // Default supervisor behavior: only their department if no filter applied
      if (currentUser.role === "supervisor" && deptFilter === "") {
        return (
          p.department.toLowerCase() === currentUser.department.toLowerCase() &&
          matchesBatch &&
          matchesTag
        );
      }

      return matchesDept && matchesBatch && matchesTag;
    });
  }, [deptFilter, batchFilter, tagFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">
        {currentUser.role === "admin"
          ? "All Departments Projects"
          : `${currentUser.department} Department Projects`}
      </h1>
      <p className="text-gray-600 mb-4">Logged in as: {currentUser.role.toUpperCase()}</p>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All Batches</option>
          {batches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>

        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <RecentProjectsTable projects={filteredProjects} />
    </div>
  );
};

export default RecentProjectsPage;
