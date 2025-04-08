"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product.controller"));
const router = (0, express_1.Router)();
// GET all products
router.get("/", product_controller_1.default.getAllProducts.bind(product_controller_1.default));
// GET single product by ID
router.get("/:id", product_controller_1.default.getProductById.bind(product_controller_1.default));
// POST create new product
router.post("/", product_controller_1.default.createProduct.bind(product_controller_1.default));
// PUT update existing product
router.put("/:id", product_controller_1.default.updateProduct.bind(product_controller_1.default));
// DELETE product
router.delete("/:id", product_controller_1.default.deleteProduct.bind(product_controller_1.default));
exports.default = router;
