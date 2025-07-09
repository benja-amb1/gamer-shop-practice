import express from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  clearCart,
} from "../controllers/carts";


const router = express.Router();

router.post("/add", addToCart);

router.get("/", getUserCart);

router.delete("/remove/:productId", removeFromCart);

router.delete("/clear", clearCart);

export default router;
