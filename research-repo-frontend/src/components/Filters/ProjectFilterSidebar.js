import { useState } from "react";

export default function ProjectFilterSidebar({ onFilter }) {
  const [filters, setFilters] = useState({
    department: "",
    batch: "",
    tags: [],
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const clearFilters = () => {
    const cleared = { department: "", batch: "", tags: [] };
    setFilters(cleared);
    onFilter(cleared); // reset in parent too
  };

  return (
    <div className="w-64 bg-white shadow-md rounded-xl p-4">
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
        <option value="CS">Computer Science</option>
        <option value="IT">Information Technology</option>
        <option value="SE">Software Engineering</option>
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
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>

      {/* Tags */}
      <label className="block mb-2 text-sm font-medium">Tags</label>
      <input
        type="text"
        name="tags"
        placeholder="AI, IoT..."
        className="w-full border rounded-md p-2 mb-4"
        value={filters.tags.join(",")}
        onChange={(e) =>
          setFilters({ ...filters, tags: e.target.value.split(",") })
        }
      />

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
