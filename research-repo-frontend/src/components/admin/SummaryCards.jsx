import React from "react";

const SummaryCards = ({ summary = {} }) => {
  const cards = [
    { title: "Total Projects", value: summary.totalProjects ?? 0, icon: "📂" },
    { title: "Ideas Analyzed", value: summary.ideasAnalyzed ?? 0, icon: "🧠" },
    { title: "Active Students", value: summary.activeStudents ?? 0, icon: "🧑‍🎓" },
    { title: "Average Rating", value: summary.avgRating ?? 0, icon: "⭐" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
        >
          <div className="text-4xl">{card.icon}</div>
          <div className="text-sm text-gray-500 mt-1">{card.title}</div>
          <div className="text-2xl font-bold mt-2">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
