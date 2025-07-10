const mongoose = require("mongoose");

const ReferralForm = new mongoose.Schema({
  CandidateName: { type: String, required: true },
  Email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Invalid email format"]
  },
  PhoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },
  JobTitle: { type: String, required: true },
  Status: {
    type: String,
    enum: ["pending", "reviewed", "hired"],
    default: "pending"
  },
  ResumeURL: {
    type: String,
    validate: {
      validator: function (v) {
        return v === "" || v.endsWith(".pdf");
      },
      message: "Only .pdf resume URLs are allowed"
    }
  }
});

const ReferralModel = mongoose.model("Referral", ReferralForm);
module.exports = ReferralModel;
