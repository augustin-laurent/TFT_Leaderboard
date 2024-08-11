import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.log("mongodb uri : ", process.env.MONGODB_URI);
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
