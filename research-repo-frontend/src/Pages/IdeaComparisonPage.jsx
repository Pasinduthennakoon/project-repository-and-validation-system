import { useEffect, useState } from "react";

function IdeaComparisonPage() {
  const [result, setResult] = useState(null);
  const [departments, setDepartments] = useState([]);

  // ✅ Fetch departments from public/users.json
  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter only students and exclude "Administration"
        const studentDepartments = [
          ...new Set(
            data
              .filter(
                (u) =>
                  u.role === "STUDENT" &&
                  u.department &&
                  u.department !== "Administration"
              )
              .map((u) => u.department)
          ),
        ];
        setDepartments(studentDepartments);
      })
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      department: e.target.department.value,
      batch: e.target.batch.value,
      title: e.target.title.value,
      abstract: e.target.abstract.value,
    };

    // 🔹 Mock similarity for now
    const mockSimilarity = Math.floor(Math.random() * 100);

    if (mockSimilarity > 40) {
      setResult({
        status: "duplicate",
        match_percentage: mockSimilarity,
        matched_project: {
          title: "AI GPA Analyzer",
          batch: "2023",
          department: "IT",
        },
      });
    } else {
      setResult({
        status: "unique",
        match_percentage: mockSimilarity,
      });
    }
  };

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
        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
        />

        {/* ✅ Department dropdown populated dynamically */}
        <select name="department" className="border p-2 w-full" required>
          <option value="">Select Department</option>
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
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Result</h3>
          {result.status === "duplicate" ? (
            <p className="text-red-600">
              ⚠️ This idea matches {result.match_percentage}% with:
              <br />
              <strong>{result.matched_project.title}</strong> (
              {result.matched_project.department}, Batch {result.matched_project.batch})
            </p>
          ) : (
            <p className="text-green-600">
              ✅ Your idea looks original! (Similarity: {result.match_percentage}%)
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default IdeaComparisonPage;
