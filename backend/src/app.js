import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movie.js";
import { seedMovies } from "./controllers/movieController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    seedMovies(); // Gọi hàm seeding sau khi kết nối DB thành công
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("Cinema API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
