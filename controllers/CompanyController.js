const Company = require("../models/CompanyModel");

// Add
exports.createCompany = async (req, res) => {
  try {
    const { companyCode, companyName } = req.body;

    if (!companyCode || !companyName) {
      return res.status(400).json({
        success: false,
        message: "Company Code and Company Name are required",
      });
    }

    const company = await Company.create({
      companyCode,
      companyName,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// View All
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// View Single
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company)
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Company deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};