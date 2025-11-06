import React from "react";

const RecentProjectsTable = () => {
  const projects = [
    {
      title: "AI Tutor System",
      department: "IT",
      year: "2024",
      uploadedBy: "Pasindu",
      rating: 4.5,
    },
    {
      title: "IoT Smart Garden",
      department: "CS",
      year: "2023",
      uploadedBy: "Lakshan",
      rating: 5.0,
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Recent Project Uploads</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-600">
            <th>Title</th>
            <th>Department</th>
            <th>Year</th>
            <th>Uploaded By</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td>{p.title}</td>
              <td>{p.department}</td>
              <td>{p.year}</td>
              <td>{p.uploadedBy}</td>
              <td>{p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentProjectsTable;
