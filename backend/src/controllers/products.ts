import mongoose from "mongoose";
import { Request, Response } from "express";
import Product from "../models/products";

export const addProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, image, price, quantity, stock, category } = req.body;

    if (!title || !description || !image || price === undefined || quantity === undefined || stock === undefined || !Array.isArray(category) || category.length === 0) {
      res.status(400).json({ status: false, message: "All fields are required." });
      return;
    }

    if (quantity === 0 && stock === true || stock === false && quantity > 0) {
      res.status(404).json({ status: false, message: "You cant put quantity if you don't have stock." });
      return;
    }

    const product = new Product({ title, description, image, price, quantity, stock, category });
    await product.save();

    res.status(201).json({ status: true, message: "Product created.", data: product });

  } catch (error) {
    res.status(500).json({ status: false, message: "Error with the server." });
    console.log(error);
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ status: false, message: "Invalid ID." });
      return;
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ status: false, message: "Product not found." });
      return;
    }

    res.status(201).json({ status: true, message: "Product deleted" });


  } catch (error) {
    res.status(500).json({ status: false, message: "Error with the server." });
    console.log(error);
  }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image, price, quantity, stock, category } = req.body;
    const { id } = req.params;

    if (!title || !description || !image || price === undefined || quantity === undefined || stock === undefined || !Array.isArray(category) || category.length === 0) {
      res.status(400).json({ status: false, message: "All fields are required." });
      return;
    }

    if (quantity === 0 && stock === true || stock === false && quantity > 0) {
      res.status(404).json({ status: false, message: "You cant put quantity if you don't have stock." });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ status: false, message: "Invalid ID." });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, image, price, quantity, stock, category },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ status: false, message: "Error to update product." });
      return;
    }

    res.status(201).json({ status: true, message: "Product updated.", data: updatedProduct });

  } catch (error) {
    res.status(500).json({ status: false, message: "Error with the server." });
    console.log(error);
  }
}


export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ status: false, message: "Invalid ID." });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ status: false, message: "Error to get product." });
      return;
    }

    res.status(200).json({ status: true, data: product });

  } catch (error) {
    res.status(500).json({ status: false, message: "Error with the server." });
    console.log(error);
  }
}

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      res.status(404).json({ status: false, message: "No products found." });
      return;
    }

    res.status(200).json({ status: true, data: products });


  } catch (error) {
    res.status(500).json({ status: false, message: "Error with the server." });
    console.log(error);
  }
}

