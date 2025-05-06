import mongoose from "mongoose";
const JobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Number,
    default: Date.now,
  },
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;
