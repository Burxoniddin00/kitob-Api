import { Router } from "express";
import { GET } from "../controllers/reting.js";

export const retingRouters = Router();

retingRouters.get("/", GET).get("/:id", GET);
