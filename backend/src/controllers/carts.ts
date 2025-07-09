import Cart from "../models/carts";
import Product from "../models/products";
import User from "../models/users";
import { Response } from "express";
import { UserReq } from "../interfaces/usereq";



export const addToCart = async (req: UserReq, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      res.status(404).json({ status: false, message: "Invalid ID or invalid quiantity." });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ status: false, message: "Product not found." });
      return;
    }

    const user = await User.findById(userId).populate('cart');
    let cart = await Cart.findById(user?.cart)

    if (!cart) {
      // create a new cart if user doesn't have one
      cart = new Cart({ items: [{ product: productId, quantity }] });
      await cart.save();

      user!.cart = cart._id;
      await user!.save();
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.status(201).json({ status: true, message: "Product added to cart", data: cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getUserCart = async (req: UserReq, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).populate({
      path: "cart",
      populate: {
        path: "items.product"
      }
    });

    if (!user || !user.cart) {
      res.status(404).json({ status: false, message: "Cart not found." });
      return;
    }

    res.status(200).json({ status: true, data: user.cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error." });
  }
};

export const removeFromCart = async (req: UserReq, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).populate("cart");
    const { productId } = req.params;

    if (!user || !user.cart) {
      res.status(404).json({ status: false, message: "Cart not found." });
      return;
    }

    const cart = await Cart.findById(user.cart._id);
    if (!cart) {
      res.status(404).json({ status: false, message: "Cart not found." });
      return;
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ status: true, message: "Product removed from cart", data: cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error." });
  }
};

export const clearCart = async (req: UserReq, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).populate("cart");

    if (!user || !user.cart) {
      res.status(404).json({ status: false, message: "Cart not found." });
      return;
    }

    const cart = await Cart.findById(user.cart._id);
    if (!cart) {
      res.status(404).json({ status: false, message: "Cart not found." });
      return;
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ status: true, message: "Cart cleared." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error." });
  }
};





