import React, { useState } from "react";

import formatFile from "../assets/docs/Documentation_Format.docx";

const Upload = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    batch: "",
    studentName: "",
    supervisorName: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      ...form,
      id: Date.now(),
      status: "WAITING_SUPERVISOR_APPROVAL",
      dateUploaded: new Date().toISOString(),
    };

    // get existing uploads
    const uploads = JSON.parse(localStorage.getItem("pending_uploads") || "[]");

    // add new upload
    uploads.push(newProject);
    localStorage.setItem("pending_uploads", JSON.stringify(uploads));

    alert("✅ Project submitted! Waiting for supervisor approval.");
    setForm({
      title: "",
      description: "",
      department: "",
      batch: "",
      studentName: "",
      supervisorName: "",
      file: null,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload New Project</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="studentRegNo"
          placeholder="Student Reg. No"
          className="border rounded px-3 py-2 w-full"
          onChange={handleChange}
          required
        />
        <input
          name="supervisorName"
          placeholder="Supervisor Name"
          className="border rounded px-3 py-2 w-full"
          onChange={handleChange}
          required
        />
        <input
          name="title"
          placeholder="Project Title"
          className="border rounded px-3 py-2 w-full"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border rounded px-3 py-2 w-full"
          onChange={handleChange}
          required
        />
        <input
          name="githubLink"
          placeholder="GitHub Link(e.g., https://github.com/username/repository)"
          className="border rounded px-3 py-2 w-full"
          onChange={handleChange}
        />
        <input
          name="department"
          placeholder="Department"
          className="border rounded px-3 py-2 w-full"
          onChange={handleChange}
          required
        />
        <input
          name="batch"
          placeholder="Batch (e.g., 2025)"
          className="border rounded px-3 py-2 w-full"
          onChange={handleChange}
          required
        />
        <div className="flex">
          <div className="text-sm font-medium text-gray-700">
            Upload Project File (PDF, DOCX, etc.)
          </div>
          <div>
            <a
              href={formatFile}
              download="Documentation_Format.docx"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-4"
            >
              Download Documentation Format
            </a>
          </div>
        </div>
        <input type="file" name="file" onChange={handleChange} required />
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
