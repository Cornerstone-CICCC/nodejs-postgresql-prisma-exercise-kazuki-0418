import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateProductInput = Omit<Product, "id">;
export type UpdateProductInput = Partial<CreateProductInput>;

export class ProductModel {
  // Get all products
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  // Get a single product by ID
  async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  // Create a new product
  async create(data: CreateProductInput): Promise<Product> {
    console.log("Creating product with data:", data);
    return prisma.product.create({
      data,
    });
  }

  // Update an existing product
  async update(id: number, data: UpdateProductInput): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  // Delete a product
  async delete(id: number): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    });
  }
}

export default new ProductModel();
