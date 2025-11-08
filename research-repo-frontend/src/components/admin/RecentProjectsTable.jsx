import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { sampleProjects } from "../../data/data";

const RecentProjectsTable = ({ projects = sampleProjects }) => {
  const navigate = useNavigate();

  const [deptFilter, setDeptFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // Generate dynamic filter options from data
  const departments = useMemo(
    () => [...new Set(projects.map((p) => p.department))],
    [projects]
  );

  const batches = useMemo(
    () => [...new Set(projects.map((p) => p.batch))],
    [projects]
  );

  const tags = useMemo(
    () =>
      [...new Set(projects.flatMap((p) => p.tags))].sort(),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesDept = deptFilter ? p.department === deptFilter : true;
      const matchesBatch = batchFilter ? p.batch === batchFilter : true;
      const matchesTag = tagFilter ? p.tags.includes(tagFilter) : true;
      return matchesDept && matchesBatch && matchesTag;
    });
  }, [projects, deptFilter, batchFilter, tagFilter]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Recent Projects</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
        >
          <option value="">All Batches</option>
          {batches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>

        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Batch</th>
              <th className="py-2 px-4 border">Tags</th>
              <th className="py-2 px-4 border">Students</th>
              <th className="py-2 px-4 border">Supervisors</th>
              <th className="py-2 px-4 border">PDF</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 cursor-pointer">
                <td
                  className="py-2 px-4 border text-blue-600"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  {project.title}
                </td>
                <td className="py-2 px-4 border">{project.department}</td>
                <td className="py-2 px-4 border">{project.batch}</td>
                <td className="py-2 px-4 border">{project.tags.join(", ")}</td>
                <td className="py-2 px-4 border">
                  {project.students.map((s) => s.name).join(", ")}
                </td>
                <td className="py-2 px-4 border">
                  {project.supervisors.map((s) => s.name).join(", ")}
                </td>
                <td className="py-2 px-4 border">
                  <a
                    href={project.pdfLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentProjectsTable;
