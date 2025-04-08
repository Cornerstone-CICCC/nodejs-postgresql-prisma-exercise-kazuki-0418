"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const library_1 = require("@prisma/client/runtime/library");
class ProductController {
    // Get all products
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_model_1.default.findAll();
                res.status(200).json({ success: true, data: products });
            }
            catch (error) {
                console.error("Error getting all products:", error);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to retrieve products" });
            }
        });
    }
    // Get a product by ID
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const product = yield product_model_1.default.findById(id);
                if (!product) {
                    res.status(404).json({ success: false, message: "Product not found" });
                    return;
                }
                res.status(200).json({ success: true, data: product });
            }
            catch (error) {
                console.error(`Error getting product with ID ${req.params.id}:`, error);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to retrieve product" });
            }
        });
    }
    // Create a new product
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = {
                    productName: req.body.productName,
                    price: new library_1.Decimal(req.body.price),
                };
                const newProduct = yield product_model_1.default.create(productData);
                res.status(201).json({ success: true, data: newProduct });
            }
            catch (error) {
                console.error("Error creating product:", error);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to create product" });
            }
        });
    }
    // Update an existing product
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const productData = {};
                if (req.body.productName !== undefined)
                    productData.productName = req.body.productName;
                if (req.body.price !== undefined)
                    productData.price = new library_1.Decimal(req.body.price);
                const product = yield product_model_1.default.findById(id);
                if (!product) {
                    res.status(404).json({ success: false, message: "Product not found" });
                    return;
                }
                const updatedProduct = yield product_model_1.default.update(id, productData);
                res.status(200).json({ success: true, data: updatedProduct });
            }
            catch (error) {
                console.error(`Error updating product with ID ${req.params.id}:`, error);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to update product" });
            }
        });
    }
    // Delete a product
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const product = yield product_model_1.default.findById(id);
                if (!product) {
                    res.status(404).json({ success: false, message: "Product not found" });
                    return;
                }
                yield product_model_1.default.delete(id);
                res
                    .status(200)
                    .json({ success: true, message: "Product deleted successfully" });
            }
            catch (error) {
                console.error(`Error deleting product with ID ${req.params.id}:`, error);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to delete product" });
            }
        });
    }
}
exports.ProductController = ProductController;
exports.default = new ProductController();
