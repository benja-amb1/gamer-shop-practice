import { Request } from "express";

export interface AuthUser {
  id: string;
  name: string;
  surname: string;
  role: string;
  email: string;
}

export interface UserReq extends Request {
  user?: AuthUser;
}