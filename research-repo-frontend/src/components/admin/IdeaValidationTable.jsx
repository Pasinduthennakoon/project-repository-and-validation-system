import React from "react";

const IdeaValidationTable = () => {
  const ideas = [
    {
      title: "Blockchain in Education",
      student: "Pasindu",
      match: 28,
      status: "Unique",
      date: "2025-09-25",
    },
    {
      title: "AI Student Feedback",
      student: "Kavindu",
      match: 82,
      status: "Duplicate",
      date: "2025-09-18",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Idea Validation Logs</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-600">
            <th>Idea Title</th>
            <th>Student</th>
            <th>Match %</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td>{idea.title}</td>
              <td>{idea.student}</td>
              <td>{idea.match}%</td>
              <td
                className={`${
                  idea.status === "Unique" ? "text-green-600" : "text-red-500"
                } font-semibold`}
              >
                {idea.status}
              </td>
              <td>{idea.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IdeaValidationTable;
