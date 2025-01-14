const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: [50, "Please provide company"],
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: [100, "Wtf is Wrong with you that Long really Bruhh"],
    },
    Status: {
      type: String,
      enum: ["Interview", "Declined :(", "Accepted :)", "Pending"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
