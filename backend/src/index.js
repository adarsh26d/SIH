import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./utils/db.js";
import institutionRouter from "./routes/institution.routes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/institution", institutionRouter)

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

connectDB().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Server started on PORT ${PORT}`);
  });
});
