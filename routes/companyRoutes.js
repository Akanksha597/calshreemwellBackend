const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/CompanyController");

router.post("/add", createCompany);

router.get("/", getCompanies);

router.get("/:id", getCompany);

router.put("/edit/:id", updateCompany);

router.delete("/delete/:id", deleteCompany);

module.exports = router;