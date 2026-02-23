import express from "express";
import { getMovies, addMovie } from "../controllers/movieController.js";
import { auth, adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", auth, adminOnly, addMovie);

export default router;
