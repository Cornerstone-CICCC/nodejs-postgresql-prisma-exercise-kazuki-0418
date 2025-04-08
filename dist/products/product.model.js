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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductModel {
    // Get all products
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.product.findMany();
        });
    }
    // Get a single product by ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.product.findUnique({
                where: { id },
            });
        });
    }
    // Create a new product
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Creating product with data:", data);
            return prisma.product.create({
                data,
            });
        });
    }
    // Update an existing product
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.product.update({
                where: { id },
                data,
            });
        });
    }
    // Delete a product
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.product.delete({
                where: { id },
            });
        });
    }
}
exports.ProductModel = ProductModel;
exports.default = new ProductModel();
