import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      console.log("Login response:", res.data);

      if (res.data.token) {
        login(res.data.user, res.data.token);
        alert("Login successful!");
        navigate("/");
      } else {
        alert(res.data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Don’t have an account */}
        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-decoration-none fw-bold text-success"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
