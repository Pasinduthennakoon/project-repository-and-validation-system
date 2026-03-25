import React from "react";

const IdeaValidationTable = ({ideas}) => {
  
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
              <td>{idea.name}</td>
              <td>{idea.matched}</td>
              <td
                className={`${
                  idea.status === "unique" ? "text-green-600" : "text-red-500"
                } font-semibold`}
              >
                {idea.status}
              </td>
              <td>{idea.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IdeaValidationTable;
