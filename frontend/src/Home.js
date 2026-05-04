import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import poster from "./assets/poster.png";

function Home() {
const navigate = useNavigate();

useEffect(() => {
AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
}, []);

const courses = [
{ name: "MCA", duration: "2 Year", fees: "₹45,000" },
{ name: "B.SC", duration: "4 Year", fees: "₹50,000" },
{ name: "BCA", duration: "3 Years", fees: "₹40,000/year" },
{ name: "PGDCA", duration: "1 Year", fees: "₹20,000" },
{ name: "Diploma in Computer Science", duration: "1 year", fees: "₹12,000" },
{ name: "Diploma in IT", duration: "6 Months", fees: "₹6,000" }
];

return ( <div style={styles.page}>

  {/* NAVBAR SPACE */}
  <div style={styles.navbar}></div>

  {/* HERO */}
  <section style={styles.hero}>
    <div style={styles.blurCircle1}></div>
    <div style={styles.blurCircle2}></div>

    <div style={styles.heroContent} data-aos="fade-up">
      <h1 style={styles.heroTitle}>
        Build Your Future <br /> With Confidence
      </h1>

      <p style={styles.heroSub}>
        Premium education experience designed for modern students.
      </p>

      <button
        style={styles.ctaBtn}
        onClick={() => navigate("/signup")}
      >
        Start Application
      </button>
    </div>
  </section>

  {/* ABOUT */}
  <section style={styles.section} data-aos="fade-up">
    <h2 style={styles.heading}>About</h2>
    <p style={styles.text}>
      Orion Eastern is a modern institution dedicated to providing high-quality
      education with a strong focus on practical skills, innovation, and career
      development. Our goal is to create confident, skilled, and responsible
      individuals who are ready to succeed in today's competitive world.
    </p>
  </section>

  {/* COURSES */}
  <section style={styles.section}>
    <h2 style={styles.heading}>Courses</h2>

    <div style={styles.grid}>
      {courses.map((c, i) => (
        <div key={i} style={styles.card} data-aos="zoom-in">
          <h4>{c.name}</h4>
          <p>{c.duration}</p>
          <p>{c.fees}</p>

          <button
            style={styles.cardBtn}
            onClick={() => {
              const student = localStorage.getItem("student");

              if (!student) {
                navigate("/login");
              } else {
                navigate("/apply", { state: { course: c.name } });
              }
            }}
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  </section>

  {/* FACILITIES */}
  <section style={styles.section}>
    <h2 style={styles.heading}>Facilities</h2>

    <div style={styles.grid}>
      {[
        "💻 Modern Computer Labs",
        "📚 Digital Library",
        "🌐 High-Speed Internet",
        "🏫 Smart Classrooms",
        "🎯 Career Guidance",
        "⚽ Sports & Activities",
      ].map((f, i) => (
        <div key={i} style={styles.glassCard} data-aos="fade-up">
          {f}
        </div>
      ))}
    </div>
  </section>

  {/* MISSION */}
  <section style={styles.section} data-aos="fade-up">
    <h2 style={styles.heading}>Our Mission</h2>

    <p style={styles.text}>
      Our mission is to empower students through quality education, skill
      development, and innovation. We aim to bridge the gap between academic
      learning and industry requirements by providing practical exposure.
    </p>
  </section>

  {/* WHY CHOOSE US */}
  <section style={styles.section}>
    <h2 style={styles.heading}>Why Choose Us</h2>

    <div style={styles.grid}>
      {[
        "🎓 Experienced Faculty",
        "💻 Practical Training",
        "📈 Career Opportunities",
        "🌍 Modern Learning",
        "🤝 Student Support",
        "🚀 Skill-Based Courses"
      ].map((f, i) => (
        <div key={i} style={styles.glassCard} data-aos="fade-up">
          {f}
        </div>
      ))}
    </div>
  </section>

  {/* CTA */}
  <section style={styles.ctaSection}>
    <h2>Admissions Open 2026</h2>

    <button
      style={styles.ctaBtn}
      onClick={() => navigate("/signup")}
    >
      Apply Now
    </button>
  </section>

  {/* CONTACT */}
  <section style={styles.section}>
    <h2 style={styles.heading}>Contact Us</h2>

    <p style={styles.text}>
      Have questions? Get in touch with us.
    </p>

    <div style={styles.contactBox}>
      <p><strong>📍 Address:</strong> Dimapur, Nagaland</p>
      <p><strong>📞 Phone:</strong> +91 98765 43210</p>
      <p><strong>📧 Email:</strong> info@orioneastern.edu</p>
    </div>

    <button
      style={styles.ctaBtn}
      onClick={() => window.location.href = "mailto:info@orioneastern.edu"}
    >
      Send Email
    </button>
  </section>

  {/* FOOTER */}
  <footer style={styles.footer}>
    © 2026
  </footer>
</div>

);
}

/* STYLES */

const styles = {
page: {
fontFamily: "Inter, sans-serif",
background: "#0f172a",
color: "#fff",
},

navbar: {
height: "70px",
},

hero: {
minHeight: "calc(100vh - 70px)",
display: "flex",
alignItems: "center",
justifyContent: "center",
position: "relative",
overflow: "hidden",
backgroundImage: "url(" + poster + ")",
backgroundSize: "cover",
backgroundPosition: "center",
},

blurCircle1: {
position: "absolute",
width: "300px",
height: "300px",
background: "#6a0dad",
filter: "blur(120px)",
top: "20%",
left: "20%",
},

blurCircle2: {
position: "absolute",
width: "300px",
height: "300px",
background: "#2563eb",
filter: "blur(120px)",
bottom: "20%",
right: "20%",
},

heroContent: {
textAlign: "center",
zIndex: 2,
},

heroTitle: {
fontSize: "60px",
fontWeight: "700",
},

heroSub: {
marginTop: "15px",
color: "#cbd5f5",
},

ctaBtn: {
marginTop: "25px",
padding: "12px 30px",
borderRadius: "10px",
border: "none",
background: "linear-gradient(120deg,#6a0dad,#2563eb)",
color: "#fff",
cursor: "pointer",
},

section: {
padding: "80px 20px",
textAlign: "center",
},

heading: {
marginBottom: "20px",
},

text: {
maxWidth: "600px",
margin: "auto",
color: "#cbd5f5",
},

grid: {
display: "flex",
flexWrap: "wrap",
justifyContent: "center",
gap: "20px",
marginTop: "30px",
},

card: {
width: "250px",
padding: "20px",
borderRadius: "15px",
background: "rgba(255,255,255,0.05)",
backdropFilter: "blur(10px)",
},

cardBtn: {
marginTop: "10px",
padding: "8px 15px",
border: "none",
borderRadius: "8px",
background: "#6a0dad",
color: "#fff",
cursor: "pointer",
},

glassCard: {
padding: "20px",
borderRadius: "12px",
background: "rgba(255,255,255,0.08)",
backdropFilter: "blur(10px)",
minWidth: "200px",
},

contactBox: {
marginTop: "20px",
lineHeight: "1.8",
},

ctaSection: {
padding: "80px",
textAlign: "center",
background: "linear-gradient(120deg,#6a0dad,#2563eb)",
},

footer: {
padding: "20px",
textAlign: "center",
background: "#020617",
},
};

export default Home;
