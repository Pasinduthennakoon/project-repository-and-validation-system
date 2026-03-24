// src/components/student/Charts/UnexploredAreas.jsx
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

  const tagToArea = {
  AI: ["ML", "AI", "Deep Learning"],
  "Data Science": ["Python", "Pandas", "NumPy", "Data Science"],
  NLP: ["NLP", "Text Processing"],
  Healthcare: ["Healthcare", "Disease", "Medical"],
  Robotics: ["Robotics"],
  IoT: ["IoT"],
  Blockchain: ["Blockchain"],
  Cybersecurity: ["Cybersecurity"],
  "Computer Vision": ["Computer Vision", "OpenCV"],
};

  // Flatten all project tags (case-insensitive)
const allTagsLower = projects.flatMap(p =>
  (Array.isArray(p.tags) ? p.tags : []).map(t => t.toLowerCase())
);

// Determine unexplored areas
const unexplored = commonAreas.filter(area => {
  const mappedTags = tagToArea[area] || [area];
  return !mappedTags.some(tag => allTagsLower.includes(tag.toLowerCase()));
});

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-2">
        Unexplored Research Areas
      </h2>
      {unexplored.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {unexplored.map((area) => (
            <li
              key={area}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {area}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">All major areas are explored!</p>
      )}
    </div>
  );
};

export default UnexploredAreas;