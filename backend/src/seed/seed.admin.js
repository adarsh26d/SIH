import dotenv from "dotenv";
import User from "../models/UserModel.js";  
import { connectDB } from "../utils/db.js";  

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: "Admin@123",
      role: "admin",
    });

    console.log("🎉 Admin created:", admin);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
