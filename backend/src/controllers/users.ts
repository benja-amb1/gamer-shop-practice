import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { UserReq } from "../interfaces/usereq";

const createNewUser = (role: string) => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, surname, email, password } = req.body;
      if (!name || !surname || !email || !password) {
        res.status(400).json({ status: false, message: "All field are required." });
        return;
      }

      const hashed = await bcrypt.hash(password, 10);

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        res.status(409).json({ status: false, message: "Email already exists." });
        return
      }

      const user = new User({ name, surname, email, password: hashed, role: role });
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

export const deleteUser = async (req: UserReq, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ status: false, message: "Invalid ID in deleteUser." });
      return
    }

    if (req.user?.id !== id) {
      res.status(404).json({ status: false, message: "You dont have access to delete this user." });
      return;
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(400).json({ status: false, message: "Error to delete user." });
      return;
    }

    res.status(200).json({ status: true, message: "User deleted." });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error." });
  }
}

export const updateUser = async (req: UserReq, res: Response): Promise<any> => {
  try {
    const { name, surname, email, password } = req.body;
    const { id } = req.params;

    if (!name || !surname || !email || !password) {
      res.status(400).json({ status: false, message: "All field are required." });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ status: false, message: "Invalid ID in update user." });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    if (req.user?.id !== id) {
      res.status(403).json({ message: "You dont have access to update this user." });
      return
    }

    const existingEmail = await User.findOne({ email, _id: { $ne: id } });
    if (existingEmail) {
      res.status(404).json({ status: false, message: "Email already exists." });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(id, { name, surname, email, password: hashed }, { new: true });
    if (!updatedUser) {
      res.status(404).json({ status: false, message: "Error to update user." });
      return;
    }

    res.status(200).json({ status: true, message: "User updated" });


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error." });
  }
}

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ status: false, message: "Invalid ID in get user." });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ status: false, message: "User not founded." });
      return;
    }

    res.status(200).json({ status: true, data: user });


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error." });
  }
}


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ status: false, message: "All fields are required." });
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({ status: false, message: "Incorrect email or password." });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ status: false, message: "Incorrect email or password." });
      return;
    }

    const payload = {
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000 // 1 h
    });

    res.status(200).json({
      status: true,
      message: "Login successful.",
      data: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error." });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ status: false, message: "No token provided." });
      return;
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'strict',
    });

    res.status(200).json({ status: true, message: "Logout successful." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error." });
  }
};

export const getSession = async (req: UserReq, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    res.status(200).json({ status: true, data: user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};
