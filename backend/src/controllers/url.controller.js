import { urlService } from "../services/url.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Controller Layer — URL
 * Responsibility: Handle HTTP req/res only.
 * Parses input, delegates to urlService, sends response.
 * No business logic or DB queries here.
 */

// POST /api/v1/url/shorten  (protected)
const createShortUrl = asyncHandler(async (req, res) => {
    const { fullUrl } = req.body;

    const urlDoc = await urlService.shortenUrl({
        fullUrl,
        userId: req.user._id,
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, urlDoc, "Short URL created successfully")
        );
});

// GET /:shortCode  — public redirect
const redirectUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;

    const originalUrl = await urlService.getOriginalUrl(shortCode);

    return res.redirect(302, originalUrl);
});

// GET /api/v1/url/my-urls  (protected)
const getUserUrls = asyncHandler(async (req, res) => {
    const urls = await urlService.getUserUrls(req.user._id);

    return res
        .status(200)
        .json(
            new ApiResponse(200, urls, "User URLs fetched successfully")
        );
});

// DELETE /api/v1/url/:id  (protected)
const deleteUrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await urlService.deleteUrl(id, req.user._id);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "URL deleted successfully")
        );
});

export {
    createShortUrl,
    redirectUrl,
    getUserUrls,
    deleteUrl,
};
