import dotenv from "dotenv";
import User from "../models/UserModel.js";  
import { connectDB } from "../utils/db.js";  

dotenv.config();

const createSuperadmin = async () => {
  try {
    await connectDB();

    const superadminExists = await User.findOne({ email: "superadmin@example.com" });
    if (superadminExists) {
      console.log("✅ Superadmin already exists:", superadminExists.email);
      process.exit(0);
    }

    const superadmin = await User.create({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: "SuperAdmin@123", 
      role: "superadmin",
    });

    console.log("🎉 Superadmin created successfully!");
    console.log({
      name: superadmin.name,
      email: superadmin.email,
      password: "SuperAdmin@123",
      role: superadmin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating superadmin:", error);
    process.exit(1);
  }
};

createSuperadmin();
