import express from "express";
import {
  createUser,
  createSemiAdmin,
  createAdmin,
  deleteUser,
  updateUser,
  getUser,
  loginUser,
  logout,
  getSession
} from "../controllers/users";
import { isAuthenticated } from "../middlewares/authMiddleware";
const router = express.Router();


router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/register/user", createUser);

router.post("/register/semiadmin", createSemiAdmin);
router.post("/register/admin", createAdmin);

router.get("/get-user/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get('/get-session', isAuthenticated, getSession)

export default router;
