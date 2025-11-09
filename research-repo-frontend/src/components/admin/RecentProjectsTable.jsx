// src/components/admin/RecentProjectsTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const RecentProjectsTable = ({ projects = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Batch</th>
              <th className="py-2 px-4 border">Tags</th>
              <th className="py-2 px-4 border">Students</th>
              <th className="py-2 px-4 border">Supervisors</th>
              <th className="py-2 px-4 border">PDF</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 cursor-pointer">
                  <td
                    className="py-2 px-4 border text-blue-600"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    {project.title}
                  </td>
                  <td className="py-2 px-4 border">{project.department}</td>
                  <td className="py-2 px-4 border">{project.batch}</td>
                  <td className="py-2 px-4 border">{project.tags.join(", ")}</td>
                  <td className="py-2 px-4 border">
                    {project.students.map((s) => s.name).join(", ")}
                  </td>
                  <td className="py-2 px-4 border">
                    {project.supervisors.map((s) => s.name).join(", ")}
                  </td>
                  <td className="py-2 px-4 border">
                    <a
                      href={project.pdfLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View PDF
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentProjectsTable;
