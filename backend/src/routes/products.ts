import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getAllProducts
} from "../controllers/products";

const router = express.Router();

// Obtener todos los productos
router.get("/", getAllProducts);

// Obtener un producto por ID
router.get("/:id", getProduct);

// Crear un nuevo producto (restringido si usas auth)
router.post("/", addProduct);

// Actualizar un producto por ID
router.put("/:id", updateProduct);

// Eliminar un producto por ID
router.delete("/:id", deleteProduct);

export default router;
