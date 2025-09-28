import { Link } from "react-router-dom";

function ProjectList({ projects }) {
  if (!projects || projects.length === 0) {
    return <p className="text-gray-500">No projects found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
        >
          <h3 className="text-lg font-bold">{project.title}</h3>
          <p className="text-sm text-gray-600">
            {project.department} | Batch {project.batch}
          </p>
          <p className="text-gray-700 mt-2 line-clamp-3">{project.abstract}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags &&
              project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Action */}
          <Link
            to={`/projects/${project.id}`} // match your route
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
