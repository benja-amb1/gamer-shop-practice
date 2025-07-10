import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { UserReq, AuthUser } from "../interfaces/usereq";


export const isAuthenticated = async (req: UserReq, res: Response, next: NextFunction): Promise<any> => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;
    console.log('Decoded token:', decoded);

    req.user = decoded;
    return next();

  } catch (error) {
    console.log("JWT error:", error);
    return res.status(401).json({ status: false, message: "Invalid or expired token" });
  }
};

