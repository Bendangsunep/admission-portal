import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`https://admission-portal-wbl8.onrender.com/application/${id}`)
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!student) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{student.name}</h2>
        <p>{student.email}</p>
        <p><b>Course:</b> {student.course}</p>
        <p><b>Status:</b> {student.status}</p>

       <div style={styles.images}>
  <img
    src={`https://admission-portal-wbl8.onrender.com/uploads/${student.passportPhoto}`}
    alt=""
  />
  <img
    src={`https://admission-portal-wbl8.onrender.com/uploads/${student.hsslcMarksheet}`}
    alt="marksheet"
  />
  <img
    src={`https://admission-portal-wbl8.onrender.com/uploads/${student.signature}`}
    alt="signature"
  />
</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#f5f7fb",
    minHeight: "100vh"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "700px",
    margin: "auto",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
  },
  images: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  }
};

export default StudentProfile;