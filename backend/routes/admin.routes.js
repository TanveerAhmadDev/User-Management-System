import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  login,
  logout,
  updateUser,
} from "../controllers/admin.contoller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/addUser", verifyAdmin, addUser);
adminRouter.post("/login", login);
adminRouter.get("/users", verifyAdmin, getUsers);
adminRouter.post("/logout", logout);
adminRouter.patch("/users/:id", verifyAdmin, updateUser);
adminRouter.delete("/users/:id", verifyAdmin, deleteUser);

export default adminRouter;
