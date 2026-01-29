import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddProject.css";

export default function AddProject() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    demoUrl: "",
    fullUrl: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert("You must be logged in!");
      return;
    }

    try {
      const res = await API.post("/projects", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Project added successfully!");
      navigate("/"); // redirect home
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to add project");
    }
  };

  return (
    <div className="container addproject-container d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 addproject-card">
        <h2 className="text-center mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Project Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder="Enter project title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Demo Video URL</label>
            <input
              name="demoUrl"
              type="url"
              className="form-control"
              placeholder="Enter demo video URL"
              value={form.demoUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Full Video URL</label>
            <input
              name="fullUrl"
              type="url"
              className="form-control"
              placeholder="Enter full video URL"
              value={form.fullUrl}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
