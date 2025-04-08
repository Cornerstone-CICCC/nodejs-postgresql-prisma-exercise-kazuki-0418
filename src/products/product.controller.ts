import { Request, Response } from "express";
import productModel, {
  CreateProductInput,
  UpdateProductInput,
} from "./product.model";
import { Decimal } from "@prisma/client/runtime/library";

export class ProductController {
  // Get all products
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await productModel.findAll();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Error getting all products:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve products" });
    }
  }

  // Get a product by ID
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const product = await productModel.findById(id);

      if (!product) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
      }

      res.status(200).json({ success: true, data: product });
    } catch (error) {
      console.error(`Error getting product with ID ${req.params.id}:`, error);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve product" });
    }
  }

  // Create a new product
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData: CreateProductInput = {
        productName: req.body.productName,
        price: new Decimal(req.body.price),
      };

      const newProduct = await productModel.create(productData);

      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create product" });
    }
  }

  // Update an existing product
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const productData: UpdateProductInput = {};

      if (req.body.productName !== undefined)
        productData.productName = req.body.productName;
      if (req.body.price !== undefined)
        productData.price = new Decimal(req.body.price);

      const product = await productModel.findById(id);

      if (!product) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
      }

      const updatedProduct = await productModel.update(id, productData);

      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.error(`Error updating product with ID ${req.params.id}:`, error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update product" });
    }
  }

  // Delete a product
  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const product = await productModel.findById(id);

      if (!product) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
      }

      await productModel.delete(id);

      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error(`Error deleting product with ID ${req.params.id}:`, error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete product" });
    }
  }
}

export default new ProductController();
