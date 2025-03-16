const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/upsc-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Models
const User = mongoose.model("User", {
  name: String,
  phone_number: String,
});

const Progress = mongoose.model("Progress", {
  user_id: mongoose.Schema.Types.ObjectId,
  subject_id: mongoose.Schema.Types.ObjectId,
  date: Date,
  lectures_completed: Number,
  revision_time: Number,
});

const Quote = mongoose.model("Quote", {
  quote_text: String,
  category: String,
});

// Twilio Setup
const client = twilio("YOUR_TWILIO_ACCOUNT_SID", "YOUR_TWILIO_AUTH_TOKEN");

// API Endpoints
app.post("/api/progress", async (req, res) => {
  const { user_id, subject_id, lectures_completed, revision_time } = req.body;
  const progress = new Progress({ user_id, subject_id, lectures_completed, revision_time, date: new Date() });
  await progress.save();
  res.send({ success: true });
});

app.get("/api/progress/:user_id", async (req, res) => {
  const progress = await Progress.find({ user_id: req.params.user_id });
  res.send(progress);
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});