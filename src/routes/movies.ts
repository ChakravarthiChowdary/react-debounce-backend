import { Router } from "express";
import { getMovies, postMovies } from "../controllers/movies";

const router = Router();

router.post("/", postMovies);
router.get("/", getMovies);

export default router;
