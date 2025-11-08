import React from "react";
import { aiIdeaSummary } from "../../data/aiIdeaAnalysis";

const AIAnalysisPanel = () => {
  const { totalIdeasAnalyzed, trendingTopics, researchGaps } = aiIdeaSummary;

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">AI Idea Analysis</h2>

      {/* Number of Ideas Analyzed */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded">
        <span className="text-gray-600 font-semibold">Total Ideas Analyzed:</span>
        <span className="text-2xl font-bold text-blue-600">{totalIdeasAnalyzed}</span>
      </div>

      {/* Trending Topics */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Trending Topics</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Research Gaps */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Research Gaps</h3>
        <ul className="list-disc list-inside text-gray-600">
          {researchGaps.map((gap, index) => (
            <li key={index}>{gap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIAnalysisPanel;
