export default function Badge({ role }) {
  const colors = {
    ADMIN: "bg-red-600",
    SUPERVISOR: "bg-purple-600",
    STUDENT: "bg-blue-600",
  };
  
  return (
    <span className={`px-3 py-1 text-white text-xs rounded-full ${colors[role]}`}>
      {role}
    </span>
  );
}
