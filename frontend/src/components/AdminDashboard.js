import React, { useEffect, useState, useCallback } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  FaHome,
  FaUserGraduate,
  FaFileAlt,
  FaFilePdf,
  FaImage,
  FaDownload,
  FaEye
} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// ✅ API BASE (optional but recommended)
const API = process.env.REACT_APP_API_URL || "https://admission-portal-wbl8.onrender.com";

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [active, setActive] = useState("dashboard");
  const [preview, setPreview] = useState(null);

  const token = localStorage.getItem("adminToken");

  // ✅ FIXED: useCallback added
  const fetchAll = useCallback(async () => {
    try {
      const appRes = await fetch(`${API}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const appData = await appRes.json();

      const stuRes = await fetch(`${API}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const stuData = await stuRes.json();

      setApplications(appData || []);
      setStudents(stuData || []);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  // ✅ FIXED: dependencies added
  useEffect(() => {
    if (!token) {
      localStorage.removeItem("adminToken");
      window.location.reload();
      return;
    }
    fetchAll();
  }, [fetchAll, token]);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/application/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchAll();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this application?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API}/application/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted successfully");

      setApplications(prev => prev.filter(app => app._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  const getFileType = (url) => {
    if (!url) return "file";
    if (url.match(/\.(jpg|jpeg|png)$/i)) return "image";
    if (url.match(/\.pdf$/i)) return "pdf";
    return "file";
  };

  const chartData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Applications",
        data: [
          applications.filter(a => a.status === "Approved").length,
          applications.filter(a => a.status === "Pending").length,
          applications.filter(a => a.status === "Rejected").length,
        ],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  return (
    <div style={layout}>
      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2>Admin</h2>

        <div style={active === "dashboard" ? activeMenu : menu} onClick={() => setActive("dashboard")}>
          <FaHome /> Dashboard
        </div>

        <div style={active === "students" ? activeMenu : menu} onClick={() => setActive("students")}>
          <FaUserGraduate /> Students
        </div>

        <div style={active === "applications" ? activeMenu : menu} onClick={() => setActive("applications")}>
          <FaFileAlt /> Applications
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1 }}>
        <div style={topbar}>
          <h2 style={{ textTransform: "capitalize" }}>{active}</h2>
          <button style={logoutBtn} onClick={handleLogout}>Logout</button>
        </div>

        {active === "dashboard" && (
          <div style={card}>
            <h3>Applications Overview</h3>
            <Bar data={chartData} />
          </div>
        )}

        {active === "students" && (
          <div style={card}>
            {students.map(s => (
              <div key={s._id} style={appCard}>
                <h3>{s.name}</h3>
                <p><b>Email:</b> {s.email}</p>
                <p><b>Phone:</b> {s.phone}</p>

                {s.application ? (
                  <>
                    <p><b>Course:</b> {s.application.course}</p>
                    <p><b>Status:</b> {s.application.status}</p>

                    <div style={docs}>
                      {Object.entries(s.application.documents || {}).map(([key, url]) => {
                        const type = getFileType(url);

                        return (
                          <div key={key} style={docCard}>
                            <p style={{ fontSize: "12px" }}>{key}</p>

                            <div style={{ fontSize: "30px" }}>
                              {type === "image" && <FaImage />}
                              {type === "pdf" && <FaFilePdf />}
                              {type === "file" && <FaFileAlt />}
                            </div>

                            <div style={docActions}>
                              {type === "image" && (
                                <button onClick={() => setPreview(url)}>
                                  <FaEye /> View
                                </button>
                              )}
                              <a href={url} download>
                                <FaDownload /> Download
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p style={{ color: "red" }}>No application submitted</p>
                )}
              </div>
            ))}
          </div>
        )}

        {active === "applications" && (
          <div style={card}>
            {applications.map(app => (
              <div key={app._id} style={appCard}>
                <h3>{app.name}</h3>
                <p><b>Email:</b> {app.email}</p>
                <p><b>Course:</b> {app.course}</p>
                <p><b>Status:</b> {app.status}</p>

                <button style={approveBtn} onClick={() => updateStatus(app._id, "Approved")}>Approve</button>
                <button style={rejectBtn} onClick={() => updateStatus(app._id, "Rejected")}>Reject</button>
                <button style={deleteBtn} onClick={() => handleDelete(app._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {preview && (
        <div style={modal} onClick={() => setPreview(null)}>
          <img src={preview} alt="" style={modalImg} />
        </div>
      )}
    </div>
  );
}

/* styles unchanged */
const layout = { display: "flex", fontFamily: "Segoe UI", background: "#f1f5f9" };
const sidebar = { width: "230px", height: "100vh", position: "sticky", top: 0, background: "#0f172a", color: "white", padding: "20px" };
const menu = { padding: "12px", marginTop: "10px", cursor: "pointer", borderRadius: "8px", display: "flex", gap: "10px" };
const activeMenu = { ...menu, background: "#1e293b" };
const topbar = { background: "#fff", padding: "20px", display: "flex", justifyContent: "space-between" };
const logoutBtn = { background: "#ef4444", color: "#fff", border: "none", padding: "8px 12px" };
const card = { padding: "20px", margin: "20px", background: "#fff", borderRadius: "12px" };
const appCard = { border: "1px solid #ddd", padding: "15px", marginBottom: "15px", borderRadius: "10px" };
const docs = { display: "flex", gap: "10px", flexWrap: "wrap" };
const docCard = { width: "130px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" };
const docActions = { display: "flex", flexDirection: "column", gap: "5px" };
const approveBtn = { background: "#22c55e", color: "#fff", marginRight: "10px" };
const rejectBtn = { background: "#ef4444", color: "#fff" };
const deleteBtn = { background: "#000", color: "#fff", marginLeft: "10px" };
const modal = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center" };
const modalImg = { maxWidth: "80%", maxHeight: "80%" };

export default AdminDashboard;