const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyCode: {
      type: String,
      required: [true, "Company code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);