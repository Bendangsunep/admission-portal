import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  // ✅ STATUS STATE
  const [status, setStatus] = useState("Loading...");

  // ✅ FETCH STATUS FROM BACKEND
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/my-application/${student?._id}`
        );
        const data = await res.json();

        setStatus(data.status || "Not Applied");
      } catch (err) {
        console.log(err);
        setStatus("Error");
      }
    };

    if (student?._id) {
      fetchStatus();
    }
  }, [student]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("studentToken");
    navigate("/");
  };

  if (!student) {
    return <h2 style={{ textAlign: "center" }}>Please login first</h2>;
  }

  return (
    <div style={styles.page}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🎓</h2>

        <button style={styles.menuBtn}>Dashboard</button>
        <button style={styles.menuBtn} onClick={() => navigate("/apply")}>
          Apply
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2>Welcome, {student.name} 👋</h2>
        </div>

        {/* CARDS */}
        <div style={styles.grid}>

          {/* PROFILE CARD */}
          <div style={styles.card}>
            <h3>Profile</h3>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
          </div>

          {/* STATUS CARD */}
          <div style={styles.card}>
            <h3>Application Status</h3>

            <p style={styles.status}>
              {status === "Loading..." && "Loading..."}
              {status === "Pending" && "Pending ⏳"}
              {status === "Approved" && "Approved ✅"}
              {status === "Rejected" && "Rejected ❌"}
              {status === "Not Applied" && "Not Applied 📄"}
              {status === "Error" && "Error ❌"}
            </p>
          </div>

          {/* ACTION CARD */}
          <div style={styles.card}>
            <h3>Quick Actions</h3>

            <button
              style={styles.applyBtn}
              onClick={() => navigate("/apply")}
            >
              Apply for Admission
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f172a",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
  },

  sidebar: {
    width: "220px",
    background: "#020617",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  logo: {
    textAlign: "center",
  },

  menuBtn: {
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    cursor: "pointer",
    textAlign: "left",
  },

  logoutBtn: {
    marginTop: "auto",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  header: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "15px",
  },

  status: {
    color: "#facc15",
    fontWeight: "bold",
  },

  applyBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(120deg,#6a0dad,#2563eb)",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Dashboard;