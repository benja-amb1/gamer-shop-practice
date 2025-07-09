import { Request, Response, NextFunction } from "express";

interface AuthUser {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface UserReq extends Request {
  user?: AuthUser;
}

export const checkRole = (...role: string[]) => {
  return (req: UserReq, res: Response, next: NextFunction): any => {
    const user = req.user;

    if (!user) {
      res.status(404).json({ status: false, message: "Not user provided" });
      return;
    }

    if (!role.includes(user.role)) {
      res.status(404).json({ status: false, message: "Access denied." });
      return;
    }

    next();
  }
}

/*
checkRole("admin", "semiadmin") -> to use is like this, cause ...role is an Array!
*/