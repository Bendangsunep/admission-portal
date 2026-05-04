import React, { useState } from "react";
import StudentRegister from "./StudentRegister";
import Login from "./Login";

function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {/* Toggle buttons */}
      <div style={styles.switchBox}>
        <button onClick={() => setShowLogin(false)} style={styles.btn}>
          Register
        </button>

        <button onClick={() => setShowLogin(true)} style={styles.btn}>
          Login
        </button>
      </div>

      {/* Show forms */}
      {showLogin ? <Login /> : <StudentRegister />}
    </div>
  );
}

const styles = {
  switchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },

  btn: {
    padding: "10px 20px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "6px",
  },
};

export default AuthPage;