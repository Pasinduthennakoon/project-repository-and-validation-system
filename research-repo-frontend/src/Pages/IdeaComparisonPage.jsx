import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ResultCard from "../components/cards/ResultCard";

function IdeaComparisonPage() {
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departmentError, setDepartmentError] = useState(null);

  // ✅ Fetch departments from the Spring Boot API
  useEffect(() => {
    const fetchDepartments = async () => {
      const API_URL = "/api/v1/user/get_user_departments"; // Adjust the base path if your controller has one

      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const responseData = await res.json();

        // 1. Check the StandardResponse status code
        if (responseData.code !== 201) {
          // Checking for 201 (as defined in your controller)
          throw new Error(
            responseData.message || "Failed to retrieve departments.",
          );
        }

        // 2. Set the departments list from the 'data' field
        // responseData.data should contain List<String>
        setDepartments(responseData.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setDepartmentError(err.message);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array means it runs once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      role: user.role,
      title: e.target.title.value,
      abstract: e.target.abstract.value,
      name: e.target.name.value,
      department: e.target.department.value,
      batch: e.target.batch.value,
    };

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to analyze idea");
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        status: "error",
        message: err.message,
      });
    }
  };

  console.log(result);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Submit a New Project Idea</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your Name"
          className="border p-2 w-full"
          required
        />
        <input name="email" placeholder="Email" className="border p-2 w-full" />

        {/* ✅ Department dropdown populated dynamically */}
        <select name="department" className="border p-2 w-full" required>
          <option value="">
            {loadingDepartments
              ? "Loading Departments..."
              : departmentError
                ? "Error loading departments"
                : "Select Department"}
          </option>

          {/* Render options only if departments array is populated */}
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <input
          name="batch"
          placeholder="Batch (e.g., 2025)"
          className="border p-2 w-full"
          required
        />
        <input
          name="title"
          placeholder="Project Title"
          className="border p-2 w-full"
          required
        />
        <textarea
          name="abstract"
          placeholder="Enter Project Abstract"
          className="border p-2 w-full h-28"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Compare Idea
        </button>
      </form>

      {result && (
        <div className="mt-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Analysis Result</h3>
            <span className="text-sm text-gray-500">
              Best Match: {result.match_percentage?.toFixed(2)}%
            </span>
          </div>

          {/* Status Banner */}
          <div
            className={`p-4 rounded-xl mb-5 text-white flex justify-between items-center shadow-md ${
              result.status === "duplicate" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <span>
              {result.status === "duplicate"
                ? "⚠️ Similar Projects Found"
                : "✅ Unique Idea"}
            </span>
            <span className="text-sm">
              {result?.top_matches?.length || 0} matches
            </span>
          </div>

          {/* Cards */}
          <div className="grid gap-4">
            {result?.top_matches?.map((m, i) => (
              <ResultCard key={i} project={m} />
            ))}
          </div>

          {/* Empty */}
          {result?.top_matches?.length === 0 && (
            <div className="text-center text-gray-500 mt-6">
              No similar projects found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IdeaComparisonPage;
