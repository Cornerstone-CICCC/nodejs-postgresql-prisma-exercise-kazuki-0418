import { Router } from "express";
import productController from "./product.controller";

const router = Router();

// GET all products
router.get("/", productController.getAllProducts.bind(productController));

// GET single product by ID
router.get("/:id", productController.getProductById.bind(productController));

// POST create new product
router.post("/", productController.createProduct.bind(productController));

// PUT update existing product
router.put("/:id", productController.updateProduct.bind(productController));

// DELETE product
router.delete("/:id", productController.deleteProduct.bind(productController));

export default router;
