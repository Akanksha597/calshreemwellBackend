const express = require("express");
const router = express.Router();

const {
  addCategory,
  getCategories,
  getCategory,
  getCategoriesByCompany,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

router.post("/add", addCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.get("/company/:companyId", getCategoriesByCompany);

router.put("/edit/:id", updateCategory);

router.delete("/delete/:id", deleteCategory);

module.exports = router;