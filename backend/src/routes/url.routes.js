import express from "express";
import {
    createShortUrl,
    getUserUrls,
    deleteUrl,
} from "../controllers/url.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// All URL management routes are protected
router.post("/shorten", verifyJWT, createShortUrl);
router.get("/my-urls", verifyJWT, getUserUrls);
router.delete("/:id", verifyJWT, deleteUrl);

export default router;
