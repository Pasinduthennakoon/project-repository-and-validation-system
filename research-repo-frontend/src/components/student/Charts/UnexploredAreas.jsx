// src/components/Charts/UnexploredAreas.jsx
import React from "react";

const UnexploredAreas = ({ projects }) => {
  const commonAreas = [
    "AI",
    "IoT",
    "Cybersecurity",
    "Blockchain",
    "Data Science",
    "NLP",
    "Healthcare",
    "Robotics",
    "Computer Vision",
  ];

  const allTags = projects.flatMap((p) => p.tags);
  const unexplored = commonAreas.filter(
    (area) => !allTags.includes(area)
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-2">Unexplored Research Areas</h2>
      {unexplored.length > 0 ? (
        <ul className="list-disc pl-6 text-gray-700">
          {unexplored.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      ) : (
        <p>All major areas are explored!</p>
      )}
    </div>
  );
};

export default UnexploredAreas;
