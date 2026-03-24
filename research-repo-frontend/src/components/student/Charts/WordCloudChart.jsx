// src/components/Charts/WordCloudChart.jsx
import React from "react";
import WordCloud from "react-d3-cloud";

const WordCloudChart = ({ projects }) => {
  // Check if projects exist
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">
          Most Frequent Research Areas
        </h2>
        <p className="text-gray-500">No project data available.</p>
      </div>
    );
  }

  // Count tag frequency safely
  const tagCounts = {};
  projects.forEach((p) =>
    p.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    })
  );

  // Prepare word cloud data
  const words = Object.entries(tagCounts).map(([text, value]) => ({
    text,
    value: value * 30, // scale value for font size
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">
        Most Frequent Research Areas
      </h2>
      <WordCloud
        data={words}
        fontSize={(word) => Math.log2(word.value) * 10}
        width={400}
        height={300}
        spiral="rectangular"
        padding={4}
      />
    </div>
  );
};

export default WordCloudChart;