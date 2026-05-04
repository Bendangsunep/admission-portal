import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/loginStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // if login successful
      if (res.ok) {
        localStorage.setItem("student", JSON.stringify(data));
        alert("Login Successful ✅");
        navigate("/dashboard");
      } 
      // if login failed
      else {
        alert(data.message || "Login Failed");
      }

    } catch (err) {
      alert("Server not running ❌");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h1 className="title">Login</h1>

        {/* Email */}
        <label>Email</label>
        <div className="input-box">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <label>Password</label>
        <div className="input-box">
          <FaLock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password..."
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Button */}
        <button type="submit" className="signup-btn">
          Login
        </button>
        {/* Bottom link */}
        <p className="bottom-text">
          Don't have an account?{" "}
          <span
            className="login-link"
            onClick={() => navigate("/")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;