// Admin login	POST	/api/admin/login
// Get users	GET	/api/admin/users
// Get one user	GET	/api/admin/users/:id
// Add user	POST	/api/admin/users
// Delete user	DELETE	/api/admin/users/:id
// Search users	GET	/api/admin/users?search=ali

import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const checkUser = await userModel.findOne({ email });

  if (!checkUser) {
    throw new apiError(404, "User not found");
  }

  const passwordCorrect = await bcrypt.compare(password, checkUser.password);

  if (!passwordCorrect) {
    throw new apiError(403, "Password incorrect");
  }

  const userId = checkUser._id;

  const user = checkUser;

  if (user.status === "Inactive") {
    throw new apiError(
      403,
      "Your account is inactive. Please contact the administration.",
    );
  }
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new apiResponse(200, "User login successfully.", { user }));
});

export const addUser = asyncHandler(async (req, res, next) => {
  const { name, username, email, password, phone, role, status } = req.body;

  if (!name || !username || !email || !password) {
    throw new apiError(400, "Name, username, email and password are required.");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new apiError(409, "User with this email or username already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    phone,
    role,
    status,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return res
    .status(201)
    .json(new apiResponse(201, "User created successfully.", userResponse));
});

export const getUsers = asyncHandler(async (req, res, next) => {
  const { search } = req.query;

  console.log("Search:", search);

  const query = {
    _id: { $ne: req.user._id },
  };

  // Only add search condition when search exists
  if (search && search.trim() !== "") {
    query.$or = [
      {
        name: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        username: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  const users = await userModel
    .find(query)
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully.",
    data: users,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { name, username, email, phone, password, role, status } = req.body;

  const user = await userModel.findById(id);

  if (!user) {
    throw new apiError(404, "User not found.");
  }

  const existingUser = await userModel.findOne({
    $or: [{ email }, { username }],
    _id: {
      $ne: id,
    },
  });

  if (existingUser) {
    throw new apiError(
      409,
      "Email or username already belongs to another user.",
    );
  }

  user.name = name;
  user.username = username;
  user.email = email;
  user.phone = phone;
  user.role = role;
  user.status = status;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  const userResponse = user.toObject();

  delete userResponse.password;

  return res
    .status(200)
    .json(new apiResponse(200, "User updated successfully.", userResponse));
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findOneAndDelete({
    _id: id,
  });

  if (!user) {
    throw new apiError(404, "User not found.");
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({
    success: true,
    message: "logged out successfully.",
  });
});
