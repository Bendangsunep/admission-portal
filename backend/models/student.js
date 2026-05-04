const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  course: String,
  address: String
});

module.exports = mongoose.model("Student", StudentSchema);