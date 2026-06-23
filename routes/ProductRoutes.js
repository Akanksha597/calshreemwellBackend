const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/add", createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/edit/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;