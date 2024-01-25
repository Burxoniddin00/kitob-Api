import { Router } from "express";
import { GET, POST } from "../controllers/register.js";

export const registerRouters = Router();

registerRouters.get("/", GET).post("/", POST);
