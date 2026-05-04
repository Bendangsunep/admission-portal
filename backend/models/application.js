console.log("Application model file loaded");
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicationNo: String,

  // STUDENT DETAILS
  name: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  nationality: String,
  address: String,
  state: String,

  // COURSE DETAILS
  department: String,
  course: String,
  previousSchool: String,
  qualification: String,

  // GUARDIAN DETAILS
  guardianName: String,
  guardianPhone: String,

  // DOCUMENTS
  passportPhoto: String,
  stCertificate: String,
  hsslcMarksheet: String,
  hsslcAdmit: String,
  hslcAdmit: String,
  signature: String,

  // PAYMENT
  paymentStatus: {
    type: String,
    default: "Pending",
  },

  transactionId: String,

  // ✅ APPLICATION STATUS (important for admin)
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"], // better control
    default: "Pending",
  },

  // DATE
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);