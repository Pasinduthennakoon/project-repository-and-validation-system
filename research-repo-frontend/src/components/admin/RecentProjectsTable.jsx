import React from "react";
import { useNavigate } from "react-router-dom";

const RecentProjectsTable = ({ projects = [] }) => {
  const navigate = useNavigate();

  console.log(projects);

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
              <th className="py-2 px-4 border">Student</th>
              <th className="py-2 px-4 border">Supervisor</th>
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
                <tr
                  key={project.projectId}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td
                    className="py-2 px-4 border text-blue-600"
                    onClick={() => navigate(`/projects/${project.projectId}`)}
                  >
                    {project.title}
                  </td>
                  <td className="py-2 px-4 border">{project.department}</td>
                  <td className="py-2 px-4 border">{project.batch}</td>
                  <td className="py-2 px-4 border">
                    {Array.isArray(project.tags) ? project.tags.join(", ") : ""}
                  </td>
                  <td className="py-2 px-4 border">
                    {project.studentName || "N/A"}
                  </td>
                  <td className="py-2 px-4 border">
                    {project.supervisorName || "N/A"}
                  </td>
                  <td className="py-2 px-4 border">
                    <a
                      onClick={() => {
                        if (!project.pdfLink) return;

                        let fileId = "";
                        if (project.pdfLink.includes("id=")) {
                          fileId = project.pdfLink.split("id=")[1];
                        } else if (project.pdfLink.includes("/d/")) {
                          fileId = project.pdfLink
                            .split("/d/")[1]
                            .split("/")[0];
                        }

                        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                        window.open(downloadUrl, "_blank");
                      }}
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
