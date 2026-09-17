// import userModel from "../models/user.model.js";
// import apiError from "../utils/apiError.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";

// export const verifyAdmin = asyncHandler(async (req, res, next) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     throw new apiError(401, "Unauthorized");
//   }

//   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//   const user = await userModel.findById(decoded.userId);

//   if (!user) {
//     throw new apiError(401, "User not found");
//   }

//   if (user.role !== "Admin") {
//     throw new apiError(403, "Admin access required");
//   }

//   req.user = user;

//   next();
// });

import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";
import userModel from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new apiError(401, "Unauthorized"));
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(new apiError(401, "Access token expired"));
      }

      if (error.name === "JsonWebTokenError") {
        return next(new apiError(401, "Invalid access token"));
      }

      return next(error);
    }

    const user = await userModel
      .findById(decoded.userId)
      .select("-password -refreshToken -otp -otpExpiry");

    if (!user) {
      return next(new apiError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyJWT;
