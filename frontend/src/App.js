import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ApplicationForm from "./components/ApplicationForm";
import StudentRegister from "./components/StudentRegister";
import Login from "./components/Login";
import Home from "./Home";
import "./index.css";
import logo from "./assets/logo.png";

import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import StudentProfile from "./components/StudentProfile";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect admin page
  const hideNavbar =
  location.pathname.startsWith("/admin") ||
  location.pathname === "/dashboard" ||
  location.pathname === "/apply";

  // ✅ FIXED: use adminToken (not token)
  const isAdminLoggedIn = localStorage.getItem("adminToken");

  return (
    <div>

      {/* ✅ PUBLIC NAVBAR */}
      {!hideNavbar && (
        <nav style={styles.nav}>

          {/* ✅ LOGO (FIXED ONLY THIS PART) */}
          <h2 style={styles.logo}>
            <img
              src={logo}
              alt="logo"
              style={{
                height: "150px",
                objectFit: "contain",
                display: "block"
              }}
            />
          </h2>

          <div>
            <button style={styles.navBtn} onClick={() => navigate("/")}>
              Home
            </button>
            <button style={styles.navBtn} onClick={() => navigate("/login")}>
              Login
            </button>
            <button style={styles.navBtn} onClick={() => navigate("/signup")}>
              Register
            </button>
          </div>
        </nav>
      )}

      {/* ✅ ROUTES */}
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<StudentRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply" element={<ApplicationForm />} />

        {/* ✅ ADMIN ROUTE (FIXED) */}
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin />
          }
        />

        {/* STUDENT PROFILE */}
        <Route path="/student/:id" element={<StudentProfile />} />

      </Routes>

    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 40px",
    background: "#0d6efd",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  // ✅ ONLY UPDATED THIS STYLE
  logo: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    height: "60px" // keeps navbar from expanding
  },

  navBtn: {
    marginLeft: "15px",
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default App;