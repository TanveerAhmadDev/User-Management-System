import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "User",
      enum: ["Admin", "User"],
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
