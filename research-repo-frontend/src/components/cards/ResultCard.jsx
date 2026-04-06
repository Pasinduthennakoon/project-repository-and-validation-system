import { useNavigate } from "react-router-dom";

function ResultCard({ project }) {
  const navigate = useNavigate();

  const percentage = (project.score * 100).toFixed(1);
  const isHigh = project.score >= 0.7; // 🔥 Only 2 states

  return (
    <div
      onClick={() => navigate(`/projects/${project.project_id}`)}
      className="group cursor-pointer p-5 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
          {project.title}
        </h4>

        {/* Badge */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            isHigh
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isHigh ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span className="group-hover:underline">View Project →</span>
      </div>
    </div>
  );
}

export default ResultCard;