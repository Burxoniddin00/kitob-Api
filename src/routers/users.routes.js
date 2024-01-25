import { Router } from "express";
import { DELETE, GET, PUT } from "../controllers/users.js";
import { ChekToken } from "../middlewares/sender.js";
import { adminChekToken } from "../middlewares/adminChekovit.js";

export const usersRouters = Router();

usersRouters
  .get("/:id", ChekToken, GET)
  .get("/", ChekToken, GET)
  .delete("/:id", adminChekToken, DELETE)
  .put("/:id", ChekToken, PUT);
