import { Router } from "express";
import {  POST } from "../controllers/login.js";

export const LoginRouters = Router();

LoginRouters.post("/", POST);
