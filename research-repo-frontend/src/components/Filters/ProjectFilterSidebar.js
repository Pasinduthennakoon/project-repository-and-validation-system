import { useState, useEffect } from "react";

export default function ProjectFilterSidebar({ projects = [], onFilter }) {
  const [filters, setFilters] = useState({
    department: "",
    batch: "",
    keywords: "",
    tagsInput: "",
  });

  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const deptSet = [...new Set(projects.map(p => p.department || ""))].filter(Boolean);
    const batchSet = [...new Set(projects.map(p => p.batch || ""))].filter(Boolean);
    setDepartments(deptSet);
    setBatches(batchSet);
  }, [projects]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const tags = filters.tagsInput
      ? filters.tagsInput.split(",").map(t => t.trim().toLowerCase()).filter(t => t)
      : [];

    onFilter({
      department: filters.department,
      batch: filters.batch,
      keywords: filters.keywords.trim(),
      tags,
    });
  };

  const clearFilters = () => {
    const cleared = { department: "", batch: "", keywords: "", tagsInput: "" };
    setFilters(cleared);
    onFilter(cleared);
  };

  return (
    <div className="w-full sm:w-64 bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-bold mb-4">Filter Projects</h2>

      {/* Department */}
      <label className="block mb-2 text-sm font-medium">Department</label>
      <select
        name="department"
        className="w-full border rounded-md p-2 mb-4"
        value={filters.department}
        onChange={handleChange}
      >
        <option value="">All</option>
        {departments.map((dept, idx) => (
          <option key={idx} value={dept}>{dept}</option>
        ))}
      </select>

      {/* Batch */}
      <label className="block mb-2 text-sm font-medium">Batch/Year</label>
      <select
        name="batch"
        className="w-full border rounded-md p-2 mb-4"
        value={filters.batch}
        onChange={handleChange}
      >
        <option value="">All</option>
        {batches.map((batch, idx) => (
          <option key={idx} value={batch}>{batch}</option>
        ))}
      </select>

      {/* Keywords */}
      <label className="block mb-2 text-sm font-medium">Keywords (Title / Abstract)</label>
      <input
        type="text"
        name="keywords"
        placeholder="Enter title or abstract"
        className="w-full border rounded-md p-2 mb-4"
        value={filters.keywords}
        onChange={handleChange}
      />

      {/* Tags */}
      <label className="block mb-2 text-sm font-medium">Tags</label>
      <input
        type="text"
        name="tagsInput"
        placeholder="AI, IoT..."
        className="w-full border rounded-md p-2 mb-4"
        value={filters.tagsInput}
        onChange={handleChange}
      />

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={clearFilters}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
