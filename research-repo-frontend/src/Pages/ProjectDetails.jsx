import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/img/cover_page.jpg";
import Github from "../components/Common/Github";
import Document from "../components/Common/Document";
import StudentCard from "../components/cards/StudentCard";
import SupervisorCard from "../components/cards/SupervisorCard";
import { useParams } from "react-router-dom";
import CommentCard from "../components/cards/CommentCard";

const ProjectPage = () => {
  const { id } = useParams();
  // 1. State to store the fetched data
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect to fetch data when the component mounts or 'id' changes
  useEffect(() => {
    const fetchProject = async () => {
      const API_URL = `/api/v1/project/${id}/details`; // Adjust base URL if needed

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming your backend returns StandardResponse<ProjectPageDataResponseDTO>
        const result = await response.json();

        if (result.code !== 200) {
          // Handle case where API response is 404/500 but HTTP status is 200
          throw new Error(result.message || "Failed to retrieve project data.");
        }

        // 3. Update state with the project details and comments
        setProjectData(result.data); // result.data contains ProjectPageDataResponseDTO
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]); // Re-run effect if 'id' changes

  console.log("Project Data:", projectData); // Debug log to check fetched data

  // 4. Handle Loading and Error States
  if (loading)
    return <p className="p-4 text-gray-500">Loading project details...</p>;
  if (error || !projectData)
    return (
      <p className="p-4 text-red-500">Error: {error || "Project not found."}</p>
    );

  // Destructure data for cleaner rendering
  const project = projectData.details;
  const comments = projectData.comments;

  const handleGithubClick = () => {
    if (project.githubLink) {
      window.open(project.githubLink, "_blank");
    } else {
      window.location.href = "#";
    }
  };

  const handleDocClick = () => {
    if (!project.pdfLink) {
      window.location.href = "#";
      return;
    }

    let fileId = "";

    if (project.pdfLink.includes("id=")) {
      fileId = project.pdfLink.split("id=")[1];
    } else if (project.pdfLink.includes("/d/")) {
      fileId = project.pdfLink.split("/d/")[1].split("/")[0];
    }

    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>

      {/* Repo Info */}
      <p className="text-gray-600 mt-2 mb-2">
        Created: {project.createdAt} &nbsp; | &nbsp;&nbsp;&nbsp; Watches:{" "}
        {project.watches} &nbsp; | &nbsp;&nbsp;&nbsp; Stars: {project.stars}
      </p>
      <hr className="border-black mb-6" />

      <div className="ml-20 mr-20">
        <img
          src={img}
          alt="Project Cover"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="ml-28 mr-28">
        {/* Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Description</h2>
          <p className="mt-2 text-gray-700">{project.description}</p>
        </div>
        <div className="flex h-[200px] mt-6 gap-6">
          {/* GitHub Button */}
          <div
            onClick={handleGithubClick}
            className={`cursor-pointer flex items-center gap-6 h-[100px] w-[500px] 
              border-2 border-gray-200 text-blue-600 
              hover:bg-blue-600 hover:text-white 
              hover:scale-105 hover:shadow-lg
              transition rounded-lg
              ${!project.githubLink ? "opacity-60" : ""}`}
          >
            <div className="w-[100px] flex justify-center">
              <Github />
            </div>

            <span className="text-xl font-bold">
              {project.githubLink ? "View Repository" : "Project Repository"}
            </span>
          </div>

          {/* Documentation Button */}
          <div
            onClick={handleDocClick}
            className={`cursor-pointer flex items-center gap-6 h-[100px] w-[500px] 
                        border-2 border-gray-200 text-blue-600 
                      hover:bg-blue-600 hover:text-white 
                        hover:scale-105 hover:shadow-lg
                        transition rounded-lg
                        ${!project.pdfLink ? "opacity-60" : ""}`}
          >
            <div className="w-[100px] flex justify-center">
              <Document />
            </div>

            <span className="text-xl font-bold">
              {project.pdfLink
                ? "Download Documentation"
                : "Project Documentation"}
            </span>
          </div>
        </div>
        Team & Supervisors
        <div className="mt-8 grid md:grid-cols-3 gap-2">
          {/* Team */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Student</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              <StudentCard student={project.students} />
            </ul>
          </div>

          {/* Supervisors */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Supervisor</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              <SupervisorCard supervisor={project.supervisors} />
            </ul>
          </div>
        </div>
        {/* Tags */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800">Tags</h2>
          <div className="flex gap-4 mt-2">
            {project.tags &&
              project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
        {/* Languages */}
        {/* <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800">Languages</h2>
          <div className="flex gap-4 mt-2">
            {project.languagesUsed &&
              project.languagesUsed.map((lang, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                >
                  <span>{lang.name}</span>
                  <span className="text-gray-500 ml-2">{lang.percent} % </span>
                </div>
              ))}
          </div>
        </div> */}
        {/* Back to repo */}
        <div className="mt-10">
          <Link
            to="/projects"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Project Repository
          </Link>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Comments</h2>
        <div className="grid gap-4">
          {comments.map((comment, idx) => (
            <CommentCard key={idx} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
