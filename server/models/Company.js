import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://www.gravatar.com/avatar/?d=mp",
  },
});

const Company = mongoose.model("Company", companySchema);
export default Company;
