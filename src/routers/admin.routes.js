import { GET, GETUSERS, POST, PUT, insert } from "../controllers/admin.js";
import { adminChekToken } from "../middlewares/adminChekovit.js";
import { Router } from "express";

export const adminRouters = Router();

adminRouters
  .get("/", adminChekToken, GET)
  .post("/", POST)
  .get("/users", adminChekToken, GETUSERS)
  .put("/:id", adminChekToken, PUT)
  .post('/add',insert);
