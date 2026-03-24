import React from "react";

const GapAnalysisSection = ({ data }) => {
  if (!data) return <div className="mt-6">Loading research gap insights...</div>;

  return (
    <div className="bg-white p-5 rounded-2xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Research Gap Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
        <div>
          <h3 className="font-semibold text-blue-600 mb-2">🔥 Trending Topics</h3>
          <ul className="list-disc pl-5">
            {data.trending?.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-red-500 mb-2">❗ Underrepresented</h3>
          <ul className="list-disc pl-5">
            {data.underrepresented?.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-green-600 mb-2">💡 Suggested Areas</h3>
          <ul className="list-disc pl-5">
            {data.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GapAnalysisSection;