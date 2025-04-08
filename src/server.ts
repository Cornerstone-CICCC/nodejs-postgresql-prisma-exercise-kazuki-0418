// Set up your server
import express from "express";
import productRoutes from "./products/product.routes";

const app = express();
app.use(express.json());

// 製品ルートの登録
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
