import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/img/cover_page.jpg";
import Github from "../components/Common/Github";
import Document from "../components/Common/Document";
import StudentCard from "../components/cards/StudentCard";
import SupervisorCard from "../components/cards/SupervisorCard";
import { useParams } from "react-router-dom";
import { sampleProjects } from "../data/data";
import { sampleComments } from "../data/sampleComments";
import CommentCard from "../components/cards/CommentCard";

const ProjectPage = () => {
  const { id } = useParams();
  const project = sampleProjects.find((p) => p.id === parseInt(id));

  if (!project) return <p className="p-4 text-gray-500">Project not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>

      {/* Repo Info */}
      <p className="text-gray-600 mt-2 mb-2">
        Created: {project.created} &nbsp; | &nbsp;&nbsp;&nbsp; Watchers:{" "}
        {project.watchers} &nbsp; | &nbsp;&nbsp;&nbsp; Stars: {project.stars}
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
          <p className="mt-2 text-gray-700">{project.abstract}</p>
        </div>

        <div className="flex  h-[200px] mt-6 p-6 pl-0 pr-0">
          <Link
            to="/projectrepository"
            className="flex mt-6 h-[100px] w-[500px] border-2 border-gray-200 text-blue-600 
             hover:bg-blue-600 hover:text-white transition rounded-lg"
          >
            <div className="w-[100px] mt-[10px] ml-8">
              <Github />
            </div>
            <div className="mt-8 ml-11">
              <span className="text-xl font-bold">Project Repository</span>
            </div>
          </Link>
          <Link
            to="/projectdocumentation"
            className="flex mt-6 ml-12 h-[100px] w-[500px] border-2 border-gray-200 text-blue-600 
             hover:bg-blue-600 hover:text-white transition rounded-lg"
          >
            <div className="w-[100px] mt-[10px] ml-8">
              <Document />
            </div>
            <div className="mt-8 ml-11">
              <span className="text-xl font-bold">Project Documentation</span>
            </div>
          </Link>
        </div>

        {/* Team & Supervisors */}
        <div className="mt-8 grid md:grid-cols-3 gap-2">
          {/* Team */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Student</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              {project.students.map((s, idx) => (
                <StudentCard key={idx} student={s} />
              ))}
            </ul>
          </div>

          {/* Supervisors */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Supervisor</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              {project.supervisors.map((sup, idx) => (
                <SupervisorCard key={idx} supervisor={sup} />
              ))}
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800">Tags</h2>
          <div className="flex gap-4 mt-2">
            {project.tags.map((tag, idx) => (
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
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800">Languages</h2>
          <div className="flex gap-4 mt-2">
            {project.languages.map((lang, idx) => (
              <div
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
              >
                <span>{lang.name}</span>
                <span className="text-gray-500 ml-2">{lang.percent}</span>
              </div>
            ))}
          </div>
        </div>

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
          {sampleComments.map((comment, idx) => (
            <CommentCard key={idx} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
