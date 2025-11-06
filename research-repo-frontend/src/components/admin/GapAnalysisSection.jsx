import React from "react";

const GapAnalysisSection = () => {
  const underrepresented = ["Blockchain in Education", "Neurosymbolic AI"];
  const trending = ["AI", "IoT", "Deep Learning"];
  const suggestions = [
    "AI for Climate Analytics",
    "Quantum AI for Education",
    "Blockchain-Based Research Validation",
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Research Gap Insights</h2>

      <div className="grid grid-cols-3 gap-4 text-gray-700">
        <div>
          <h3 className="font-semibold text-blue-600 mb-2">🔥 Trending Topics</h3>
          <ul className="list-disc pl-5">
            {trending.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-red-500 mb-2">❗ Underrepresented Topics</h3>
          <ul className="list-disc pl-5">
            {underrepresented.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-green-600 mb-2">💡 Suggested New Areas</h3>
          <ul className="list-disc pl-5">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GapAnalysisSection;
