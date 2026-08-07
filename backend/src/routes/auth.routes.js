import express from "express"
import {register, login, logout} from "../controllers/auth.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

// router.post("/")
router.post("/register",register);
router.post("/login", login);
router.post("/logout",verifyJWT ,logout)

export default router