import React, { useState } from "react";

const UploadProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    abstract_: "",
    department: "",
    batch: "",
    createdAt: new Date().toISOString().split("T")[0]
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      // ✅ IMPORTANT: Send JSON as "data"
      data.append(
        "data",
        new Blob([JSON.stringify(formData)], {
          type: "application/json"
        })
      );

      // ✅ Attach file
      if (file) {
        data.append("file", file);
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/project/save_past_project",
        {
          method: "POST",
          body: data
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        throw new Error("Upload failed");
      }

      await response.json();

      setMessage("✅ Project uploaded successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        abstract_: "",
        department: "",
        batch: "",
        createdAt: new Date().toISOString().split("T")[0]
      });

      setFile(null);

    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed. Check backend.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload Project</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
          style={styles.textarea}
        />

        <textarea
          name="abstract_"
          placeholder="Full Abstract"
          value={formData.abstract_}
          onChange={handleChange}
          rows="8"
          required
          style={{ ...styles.textarea, whiteSpace: "pre-wrap" }}
        />

        {/* File Upload */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="batch"
          placeholder="Batch (e.g. 2020)"
          value={formData.batch}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Uploading..." : "Upload Project"}
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "vertical"
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4f46e5",
    color: "white",
    fontSize: "15px",
    cursor: "pointer"
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold"
  }
};

export default UploadProject;