import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import formatFile from "../assets/docs/Documentation_Format.docx";
import projectService from "../services/projectService";

const Upload = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    batch: "",
    studentRegNo: "",
    supervisorName: "",
    githubLink: "",
    file: null,
  });

  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredSupervisors, setFilteredSupervisors] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userFetchError, setUserFetchError] = useState(null);

  // src/components/pages/Upload.jsx (MODIFIED useEffect)

  useEffect(() => {
    const fetchUsers = async () => {
      const API_URL = "/api/v1/user/upload_uses"; // Adjust port/path if needed
      setLoadingUsers(true);
      setUserFetchError(null);

      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const responseData = await res.json();

        // Check the StandardResponse status code (using 201 as defined in your controller)
        if (responseData.code !== 201) {
          throw new Error(
            responseData.message || "Failed to retrieve user data."
          );
        }

        // The list of DTOs is in responseData.data
        const data = responseData.data;

        setUsers(data); // Set the full list of DTOs

        // Extract unique departments from students only (Logic remains the same, but uses API data)
        const deptSet = new Set(
          data
            .filter(
              // Check if role is 'STUDENT' and department exists
              (u) => u.role === "STUDENT" && u.department && u.department !== ""
            )
            .map((u) => u.department)
        );

        // You might need to add the exclusion logic for "Administration" here
        // if you didn't move it to the backend service layer yet.
        // Example if filtering on frontend:
        // setDepartments([...deptSet].filter(d => d !== "Administration"));

        setDepartments([...deptSet]); // Set the extracted unique departments
      } catch (err) {
        console.error("❌ Failed to load user data from API:", err);
        setUserFetchError(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle input and dropdown changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });

    if (name === "department") {
      // Filter supervisors from the selected student department
      const supervisors = users.filter(
        (u) => u.role === "SUPERVISOR" && u.department === value
      );
      setFilteredSupervisors(supervisors);
      setForm((prev) => ({ ...prev, department: value, supervisorName: "" }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedSupervisor = filteredSupervisors.find(
      (sup) => sup.userName === form.supervisorName
    );

    if(!selectedSupervisor || !form.file) {
      alert("❌ Please complete all required fields.");
      return;
    }

    const supervisorId = selectedSupervisor.userId;

    // --- 2. Prepare the DTO data object ---
    const pendingProjectData = {
      title: form.title,
      abstract_: form.description, 
      githubLink: form.githubLink,
      department: form.department,
      regNo: form.studentRegNo,
      batch: form.batch,
      uploaderId: user.userId, // Assuming user context provides userId
      supervisorId: supervisorId,
    };

    // --- 3. Create FormData object ---
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(pendingProjectData)], { type: "application/json" })
    );
    formData.append("file", form.file);

    // --- 4. Call the Service ---
    try {
        const result = await projectService.addNewProject(formData);

        if (result.ok) {
            alert(`✅ Project submitted successfully! ID: ${result.data}. Waiting for supervisor approval.`);
            // Reset form on success
            setForm({
                title: "", description: "", department: "", batch: "",
                studentRegNo: "", supervisorName: "", githubLink: "", file: null,
            });
            setFilteredSupervisors([]);
        } else {
            // Handle error message returned from the service
            throw new Error(result.message);
        }

    } catch (error) {
        console.error("Upload failed:", error);
        alert(`❌ Failed to submit project: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload New Project</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="studentRegNo"
          placeholder="Student Reg. No"
          className="border rounded px-3 py-2 w-full"
          value={form.studentRegNo}
          onChange={handleChange}
          required
        />

        {/* Department Dropdown */}
        <select
          name="department"
          className="border rounded px-3 py-2 w-full"
          value={form.department}
          onChange={handleChange}
          required
        >
          <option value="">
            {loadingUsers
              ? "Loading Users..."
              : userFetchError
              ? "Error loading departments"
              : "Select Department"}
          </option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Supervisor Dropdown */}
        <select
          name="supervisorName"
          className="border rounded px-3 py-2 w-full"
          value={form.supervisorName}
          onChange={handleChange}
          required
          // ⛔ Disables the dropdown if no department is selected
          disabled={!form.department}
        >
          <option value="">
            {/* Dynamic placeholder text */}
            {form.department ? "Select Supervisor" : "Select Department First"}
          </option>

          {/* 🗺️ Maps over the filteredSupervisors array */}
          {filteredSupervisors.map((sup) => (
            <option key={sup.userId} value={sup.userName}>
              {sup.userName}
            </option>
          ))}
        </select>

        <input
          name="title"
          placeholder="Project Title"
          className="border rounded px-3 py-2 w-full"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border rounded px-3 py-2 w-full"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="githubLink"
          placeholder="GitHub Link (optional)"
          className="border rounded px-3 py-2 w-full"
          value={form.githubLink}
          onChange={handleChange}
        />

        <input
          name="batch"
          placeholder="Batch (e.g., 2025)"
          className="border rounded px-3 py-2 w-full"
          value={form.batch}
          onChange={handleChange}
          required
        />

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Upload Project File (PDF, DOCX, etc.)
          </span>
          <a
            href={formatFile}
            download="Documentation_Format.docx"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Download Format
          </a>
        </div>

        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="block w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;
