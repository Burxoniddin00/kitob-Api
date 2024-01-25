import { GET, GETUSERS, POST, PUT } from "../controllers/admin.js";
import { adminChekToken } from "../middlewares/adminChekovit.js";
import { Router } from "express";

export const adminRouters = Router();

adminRouters
  .get("/", adminChekToken, GET)
  .post("/", POST)
  .get("/users", adminChekToken, GETUSERS)
  .put("/:id", adminChekToken, PUT);
