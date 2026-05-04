require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
const SECRET_KEY = process.env.JWT_SECRET;

/* ================= CORS FIX ================= */
app.use(cors({
  origin: "*", // allow all for now (safe for testing)
}));

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const BASE_URL = process.env.BASE_URL || "https://admission-portal-wbl8.onrender.com";

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

/* ================= MODELS ================= */
const Student = mongoose.model("Student", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
}));

const Application = mongoose.model("Application", new mongoose.Schema({
  studentId: String,
  name: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  nationality: String,
  address: String,
  state: String,
  department: String,
  course: String,
  previousSchool: String,
  qualification: String,
  guardianName: String,
  guardianPhone: String,
  documents: { type: Object, default: {} },
  paymentStatus: { type: String, default: "Pending" },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedDate: { type: Date, default: Date.now },
}));

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* ================= ADMIN ================= */
app.post("/admin/login", (req, res) => {
  if (req.body.email === "admin@gmail.com" && req.body.password === "1234") {
    const token = jwt.sign({ role: "admin" }, SECRET_KEY);
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid" });
});

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== "admin") return res.sendStatus(403);
    next();
  } catch {
    res.sendStatus(401);
  }
};

/* ================= STUDENT ================= */
app.post("/addStudent", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await new Student({ name, email, password: hashed, phone }).save();

    res.json({ message: "Registered successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering ❌" });
  }
});

app.post("/loginStudent", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });

    if (!student) {
      return res.status(400).json({ message: "Invalid email ❌" });
    }

    const ok = await bcrypt.compare(req.body.password, student.password);

    if (!ok) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login error ❌" });
  }
});

/* ================= APPLY ================= */
app.post(
  "/apply",
  upload.fields([
    { name: "passportPhoto" },
    { name: "stCertificate" },
    { name: "hsslcMarksheet" },
    { name: "hsslcAdmit" },
    { name: "hslcAdmit" },
    { name: "signature" },
  ]),
  async (req, res) => {
    try {
      if (!req.body.studentId) {
        return res.status(400).json({ message: "studentId missing ❌" });
      }

      const documents = {};
      if (req.files) {
        Object.keys(req.files).forEach((key) => {
          if (req.files[key] && req.files[key][0]) {
            documents[key] = "uploads/" + req.files[key][0].filename;
          }
        });
      }

      const appData = new Application({
        ...req.body,
        studentId: req.body.studentId,
        documents,
      });

      await appData.save();

      res.json({ message: "Application submitted ✅" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error ❌" });
    }
  }
);

/* ================= STATUS ================= */
app.get("/api/my-application/:studentId", async (req, res) => {
  try {
    const appData = await Application.findOne({
      studentId: req.params.studentId.toString(),
    }).sort({ appliedDate: -1 });

    if (!appData) {
      return res.json({ status: "Not Applied" });
    }

    res.json(appData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ================= START ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));