import React, { useState } from "react";

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
    console.log("Uploading:", form);
    alert("Project submitted successfully!");
    // Here you can call your backend API to actually save the project
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload New Project</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="studentName"
          placeholder="Student Name"
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
        <input
          type="file"
          name="file"
          onChange={handleChange}
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
