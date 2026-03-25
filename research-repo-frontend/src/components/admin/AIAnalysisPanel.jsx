import React, { useEffect, useState } from "react";
import axios from "axios";

const AIAnalysisPanel = ({ projects = [] }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projects.length) return;

    const titles = projects.map(p => p.title);

    axios.post("http://localhost:8000/ai_analyse_idea", {titles})
    .then(res => {
      console.log("AI Response:", res.data);
      setData(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });

  }, [projects]);

  if (loading) {
    return <div className="p-6 bg-white rounded shadow">Analyzing ideas...</div>;
  }

  if (!data) {
    return <div className="p-6 bg-white rounded shadow text-red-500">Failed to load AI insights</div>;
  }

  const {
    totalIdeasAnalyzed = 0,
    trendingTopics = []
  } = data;

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">AI Idea Analysis</h2>

      {/* Total Ideas */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded">
        <span className="text-gray-600 font-semibold">Total Ideas Analyzed:</span>
        <span className="text-2xl font-bold text-blue-600">
          {totalIdeasAnalyzed}
        </span>
      </div>

      {/* Trending Topics */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Trending Topics</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.length > 0 ? (
            trendingTopics.map((topic, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {topic}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No topics found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisPanel;