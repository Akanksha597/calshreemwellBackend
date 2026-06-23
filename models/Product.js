const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    quantityVolume: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      
      
    },

    mrpPerUnit: {
      type: Number,
      required: true,
    },

    dpPerUnit: {
      type: Number,
      required: true,
    },

    spPerUnit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);