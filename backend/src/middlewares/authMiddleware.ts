import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface AuthUser {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface UserReq extends Request {
  user?: AuthUser;
}

export const isAuthenticated = async (req: UserReq, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(404).json({ status: false, message: "Not token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;

    req.user = decoded;
    next();


  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
    console.log(error);
  }
}