import { Link } from "react-router-dom";

function ProjectList({ projects }) {
  if (!projects || projects.length === 0) {
    return <p className="text-gray-500">No projects found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition min-h-48 flex flex-col"
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-sm text-gray-600">
              {project.department} | Batch {project.batch}
            </p>
          </div>

          {/* Action */}
          <Link
            to={`/projects/${project.projectId}`} // match your route
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            View Project →
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
