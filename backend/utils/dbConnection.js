import mongoose from "mongoose";

const dbConnection = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Database Connected");

    return mongoose.connection;
  } catch (error) {
    console.error("Database is Not Connected");
    console.error(error);
  }
};

export default dbConnection;
