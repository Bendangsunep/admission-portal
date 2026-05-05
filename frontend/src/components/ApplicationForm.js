import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "https://admission-portal1-fa8z.onrender.com";
function ApplicationForm() {
  const student = JSON.parse(localStorage.getItem("student"));
  const location = useLocation();
const selectedCourse = location.state?.course || "";

  const initialFormState = {
    applicationNo: "APP-" + Math.floor(100000 + Math.random() * 900000),
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    state: "",
    department: "",
    course: selectedCourse,
    previousSchool: "",
    qualification: "",
    guardianName: "",
    guardianPhone: "",
    paymentMethod: "",
  };

  const initialDocsState = {
    passportPhoto: null,
    stCertificate: null,
    hsslcMarksheet: null,
    hsslcAdmit: null,
    hslcAdmit: null,
    signature: null,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [documents, setDocuments] = useState(initialDocsState);

  const [paymentDone, setPaymentDone] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeTab, setActiveTab] = useState("UPI");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "paymentMethod") {
      setPaymentDone(false);
    }
  };

  const handleFileChange = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  /* CARD FORMAT */
  const formatCard = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  /* ================= PAYMENT ================= */
  const handlePayment = () => {
    if (!formData.paymentMethod) {
      alert("Please select payment method first");
      return;
    }

    setShowPaymentModal(true);
  };

  const confirmPayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setPaymentDone(true);
      setShowPaymentModal(false);
      alert("Payment Successful ✅");
    }, 2000);
  };

  /* ================= FINAL SUBMIT ================= */
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!paymentDone) {
    alert("Please complete payment first ❌");
    return;
  }

  const form = new FormData();
  const student = JSON.parse(localStorage.getItem("student"));
  const token = localStorage.getItem("token");

  form.append("studentId", student._id);
  form.append("paymentStatus", "Paid");

  Object.keys(formData).forEach((key) => {
    form.append(key, formData[key]);
  });

  Object.keys(documents).forEach((key) => {
    if (documents[key]) {
      form.append(key, documents[key]);
    }
  });

  try {
    const res = await fetch(`${API}/apply`, {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    console.log("🔥 SUBMIT RESPONSE:", data);

    if (res.ok) {
      alert("Submitted 🎓");
      window.location.href = "/dashboard"; // better than reload
    } else {
      alert(data.message || "Submission failed");
    }
  } catch (err) {
    console.log(err);
    alert("Error submitting form ❌");
  }
};

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>University Admission Application Form</h1>

        <p style={styles.appNo}>
          Application Number: <strong>{formData.applicationNo}</strong>
        </p>

        {/* -------- SAME FORM -------- */}

        <h3 style={styles.section}>Personal Information</h3>
        <div style={styles.grid}>
          <input value={formData.name} disabled />
          <input value={formData.email} disabled />
          <input value={formData.phone} disabled />
          <input type="date" name="dob" onChange={handleChange} required />

          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input name="nationality" placeholder="Nationality" onChange={handleChange} required />
        </div>

        <h3 style={styles.section}>Address Information</h3>
        <div style={styles.grid}>
          <input name="address" placeholder="Full Address" onChange={handleChange} required />
          <input name="state" placeholder="State / Region" onChange={handleChange} required />
        </div>

        <h3 style={styles.section}>Department</h3>
        <select name="department" onChange={handleChange} required style={styles.fullInput}>
          <option value="">Select Department</option>
          <option>Information Technology (IT)</option>
          <option>Computer Science</option>
          <option>Cyber Security</option>
          <option>Software Development</option>
          <option>Electronics & Communication</option>
          <option>Data Science / AI</option>
        </select>

        <h3 style={styles.section}>Programme / Course</h3>
        <select
  name="course"
  value={formData.course}
  onChange={handleChange}
  required
  style={styles.fullInput}
>
          <option value="">Select Course</option>
          <option>BCA</option>
          <option>B.Sc Computer Science</option>
          <option>MCA</option>
          <option>PGDCA</option>
          <option>Diploma in Computer Science</option>
          <option>Diploma in IT</option>
        </select>

        <h3 style={styles.section}>Academic Information</h3>
        <div style={styles.grid}>
          <input name="previousSchool" placeholder="Previous School / College" onChange={handleChange} required />
          <input name="qualification" placeholder="Qualification" onChange={handleChange} required />
        </div>

        <h3 style={styles.section}>Guardian Information</h3>
        <div style={styles.grid}>
          <input name="guardianName" placeholder="Guardian Name" onChange={handleChange} required />
          <input name="guardianPhone" placeholder="Guardian Phone" onChange={handleChange} required />
        </div>

        {/* ✅ FIXED LABELS */}
        <h3 style={styles.section}>Upload Documents</h3>
        <div style={styles.uploadBox}>
          <label>Passport Photo</label>
          <input type="file" name="passportPhoto" onChange={handleFileChange} required />

          <label>ST Certificate</label>
          <input type="file" name="stCertificate" onChange={handleFileChange} required />

          <label>HSSLC Marksheet</label>
          <input type="file" name="hsslcMarksheet" onChange={handleFileChange} required />

          <label>HSSLC Admit Card</label>
          <input type="file" name="hsslcAdmit" onChange={handleFileChange} required />

          <label>HSLC Admit Card</label>
          <input type="file" name="hslcAdmit" onChange={handleFileChange} required />

          <label>Signature</label>
          <input type="file" name="signature" onChange={handleFileChange} required />
        </div>

        {/* PAYMENT */}
        <h3 style={styles.section}>Payment</h3>

        <div style={styles.paymentBox}>
          {["UPI", "Debit Card", "Net Banking"].map((method) => (
            <div
              key={method}
              onClick={() => setFormData({ ...formData, paymentMethod: method })}
              style={{
                ...styles.paymentOption,
                border: formData.paymentMethod === method ? "2px solid #6a0dad" : "1px solid #ccc",
                background: formData.paymentMethod === method ? "#f3e8ff" : "#fff",
              }}
            >
              {method}
            </div>
          ))}
        </div>

        <button type="button" onClick={handlePayment} style={styles.button}>
          {paymentDone ? "Payment Completed ✅" : "Proceed to Pay"}
        </button>

        <button type="submit" style={styles.button}>
          Submit Application
        </button>
      </form>

      {/* MODAL */}
      {showPaymentModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Secure Payment</h2>

            <div style={styles.tabs}>
              {["UPI", "Card", "Net Banking"].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.tab,
                    borderBottom: activeTab === tab ? "2px solid blue" : "none",
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* REAL QR */}
            {activeTab === "UPI" && (
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi-payment"
                alt="QR"
                style={{ width: "200px", margin: "auto", display: "block" }}
              />
            )}

            {/* CARD FORMAT */}
            {activeTab === "Card" && (
              <div style={styles.paymentContent}>
                <input
                  placeholder="Card Number"
                  style={styles.input}
                  onChange={(e) => (e.target.value = formatCard(e.target.value))}
                />
                <input placeholder="Expiry (MM/YY)" style={styles.input} />
                <input placeholder="CVV" style={styles.input} />
              </div>
            )}

            {activeTab === "Net Banking" && (
              <div style={styles.paymentContent}>
                <select style={styles.input}>
                  <option>Select Bank</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                </select>
              </div>
            )}

            <button onClick={confirmPayment} style={styles.payBtn}>
              {processing ? "Processing..." : "Pay ₹500"}
            </button>

            <button onClick={() => setShowPaymentModal(false)} style={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES SAME AS YOURS */
const styles = {
  container: {
  minHeight: "100vh",
  background: "#0f172a", // same as homepage
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "40px",
},
  card: {
    width: "850px",
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
  },
  title: { textAlign: "center" },
  appNo: { textAlign: "center", color: "#6a0dad" },
  section: { marginTop: "20px", color: "#6a0dad" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  uploadBox: { display: "flex", flexDirection: "column", gap: "10px" },
  fullInput: { width: "100%", padding: "10px" },
  button: { marginTop: "20px", width: "100%", padding: "12px", background: "#6a0dad", color: "#fff", border: "none" },

  paymentBox: { display: "flex", gap: "10px", marginTop: "10px" },
  paymentOption: { flex: 1, padding: "12px", textAlign: "center", borderRadius: "8px", cursor: "pointer" },

  modalOverlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
  },
  modal: { background: "#fff", padding: "20px", borderRadius: "10px", width: "350px" },
  tabs: { display: "flex", justifyContent: "space-around" },
  tab: { cursor: "pointer", padding: "10px" },
  paymentContent: { marginTop: "15px" },
  input: { width: "100%", padding: "10px", marginBottom: "10px" },
  payBtn: { width: "100%", padding: "10px", background: "blue", color: "#fff", border: "none" },
  cancelBtn: { marginTop: "10px", width: "100%", padding: "10px" },
};

export default ApplicationForm;