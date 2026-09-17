import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  login,
  logout,
  updateUser,
} from "../controllers/admin.contoller.js";
import verifyJWT from "../middlewares/verifyAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/addUser", verifyJWT, addUser);
adminRouter.post("/login", login);
adminRouter.get("/users", verifyJWT, getUsers);
adminRouter.post("/logout", logout);
adminRouter.patch("/users/:id", verifyJWT, updateUser);
adminRouter.delete("/users/:id", verifyJWT, deleteUser);

export default adminRouter;
