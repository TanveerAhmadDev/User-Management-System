import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new apiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await userModel.findById(decoded.userId);

  if (!user) {
    throw new apiError(401, "User not found");
  }

  if (user.role !== "Admin") {
    throw new apiError(403, "Admin access required");
  }

  req.user = user;

  next();
});
