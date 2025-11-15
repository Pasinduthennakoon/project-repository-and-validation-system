import { useState } from "react";

function SupervisorValidationPage() {
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      abstract: e.target.abstract.value,
    };

    // Mock similarity check (replace later with backend API call)
    const mockSimilarity = Math.floor(Math.random() * 100);

    if (mockSimilarity > 40) {
      setResult({
        status: "duplicate",
        match_percentage: mockSimilarity,
        matched_project: {
          title: "Smart Research Repository System",
          batch: "2023",
          department: "Computer Science",
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
          name="title"
          placeholder="Project Title"
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="abstract"
          placeholder="Enter Project Abstract"
          className="border p-2 w-full h-32 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
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

export default SupervisorValidationPage;
