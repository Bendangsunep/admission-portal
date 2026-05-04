import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const API = process.env.REACT_APP_API_URL; // ✅ ADD THIS

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/admin/login`, { // ✅ FIXED
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/admin");

    } catch (err) {
      console.error(err);
      alert("Backend not reachable");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-card">
        <h1 className="title">Admin Login</h1>

        <label>Email</label>
        <div className="input-box">
          <FaEnvelope className="icon" />
          <input
            name="email"
            type="email"
            placeholder="Enter admin email..."
            value={formData.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <label>Password</label>
        <div className="input-box">
          <FaLock className="icon" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
            value={formData.password}
            autoComplete="new-password"
            onChange={handleChange}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="eye"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="signup-btn">
          Login
        </button>

        <p className="bottom-text">
          Admin access only
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;