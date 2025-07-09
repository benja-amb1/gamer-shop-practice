import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from 'bcrypt';

const createNewUser = (role: string) => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, surname, email, password } = req.body;
      if (!name || !surname || !email || !password) {
        res.status(400).json({ status: false, message: "All field are required." });
        return;
      }

      const hashed = await bcrypt.hash(password, 10);
      if (!hashed) {
        res.status(500).json({ status: false, message: "Password not hashed" });
        return;
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        res.status(409).json({ status: false, message: "Email already exists." });
        return
      }

      const user = new User({ name, surname, email, password: hashed, role });
      await user.save();

      res.status(201).json({ status: true, message: "User created successfuly", data: user });


    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Server error." });
    }
  }
}

export const createUser = createNewUser('user');
export const createSemiAdmin = createNewUser('semiadmin');
export const createAdmin = createNewUser('admin');
