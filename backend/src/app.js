import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectUrl } from "./controllers/url.controller.js";

const app = express();

app.use(cors({
    origin: (process.env.CORS_ORIGIN || "http://localhost:5173").trim(),
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "URL Shortener API Running",
    });
});

// Auth routes
app.use("/api/v1/auth", authRoutes);

// URL management routes
app.use("/api/v1/url", urlRoutes);

// Public short-code redirect — must come AFTER named API routes
app.get("/:shortCode", redirectUrl);

// Global error handler — must be LAST middleware
// Catches any ApiError forwarded by asyncHandler → next(err)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || [],
    });
});

export { app };