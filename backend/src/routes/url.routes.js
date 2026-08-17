import express from "express";
import {
    createShortUrl,
    getUserUrls,
    deleteUrl,
} from "../controllers/url.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public — anyone can shorten a URL
router.post("/shorten", createShortUrl);

// Protected — only logged-in users can manage their URLs
router.get("/my-urls", verifyJWT, getUserUrls);
router.delete("/:id", verifyJWT, deleteUrl);

export default router;
