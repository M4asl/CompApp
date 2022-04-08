const express = require("express");

const {
  productList,
  createProduct,
  removeProduct,
  productById,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(productList);

router.route("/").post(createProduct);

router.route("/:productId").get(productById);

router.route("/:productId").delete(removeProduct);

router.route("/:productId").put(updateProduct);

module.exports = router;
