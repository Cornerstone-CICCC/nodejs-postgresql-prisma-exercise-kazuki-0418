"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Set up your server
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("./products/product.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// 製品ルートの登録
app.use("/products", product_routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
