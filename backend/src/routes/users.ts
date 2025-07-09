import express from "express";
import {
  createUser,
  createSemiAdmin,
  createAdmin,
  deleteUser,
  updateUser,
  getUser,
  loginUser,
  logout
} from "../controllers/users";
const router = express.Router();


router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/register", createUser);

router.post("/register/semiadmin", createSemiAdmin);
router.post("/register/admin", createAdmin);

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
