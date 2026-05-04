import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";

const API = process.env.REACT_APP_API_URL;

function StudentRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/addStudent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.text();
      alert(data);
      setFormData({ name: "", email: "", password: "", phone: "" });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h1 className="title">Signup</h1>

        <label>Full Name</label>
        <div className="input-box">
          <FaUser className="icon" />
          <input
            name="name"
            placeholder="Enter your name..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <label>Email</label>
        <div className="input-box">
          <FaEnvelope className="icon" />
          <input
            name="email"
            type="email"
            placeholder="Enter your email..."
            value={formData.email}
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
            placeholder="Enter your password..."
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label>Phone Number</label>
        <div className="input-box">
          <FaPhone className="icon" />
          <input
            name="phone"
            placeholder="Enter your phone..."
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup-btn">
          Signup
        </button>

        <p className="bottom-text">
          Already have an account? <a href="/login" className="login-link">Login</a>
        </p>
      </form>
    </div>
  );
}

export default StudentRegister;