import { Router } from "express";
import { DELETE, GETALL, POST, PUT } from "../controllers/usersBooks.js";
import { ChekToken } from "../middlewares/sender.js";
import { adminChekToken } from "../middlewares/adminChekovit.js";

export const userBooksRouters = Router();

userBooksRouters
  .post("/", ChekToken, POST)
  .get("/", ChekToken, GETALL)
  .get("/:id", ChekToken, GETALL)
  .put("/:id", PUT)
  .delete("/:id", adminChekToken, DELETE);
