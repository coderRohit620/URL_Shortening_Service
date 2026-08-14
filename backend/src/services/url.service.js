import { nanoid } from "nanoid";
import { ApiError } from "../utils/ApiError.js";
import { urlRepository } from "../repositories/url.repository.js";

/**
 * Service Layer — URL
 * Responsibility: Business logic for URL shortening operations.
 * Calls urlRepository for DB operations. No req/res here.
 */

// Validate that a string is a well-formed URL
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Shorten a URL — generate a unique short code and persist
const shortenUrl = async ({ fullUrl, userId }) => {
    if (!fullUrl) {
        throw new ApiError(400, "URL is required");
    }

    if (!isValidUrl(fullUrl)) {
        throw new ApiError(400, "Invalid URL format");
    }

    const short_url = nanoid(7); // e.g. "aB3dX7z"

    const urlDoc = await urlRepository.createUrl({
        full_url: fullUrl,
        short_url,
        user: userId,
    });

    return urlDoc;
};

// Look up the original URL by short code and increment click count
const getOriginalUrl = async (shortCode) => {
    const urlDoc = await urlRepository.findByShortUrl(shortCode);

    if (!urlDoc) {
        throw new ApiError(404, "Short URL not found");
    }

    await urlRepository.incrementClick(shortCode);

    return urlDoc.full_url;
};

// Get all URLs created by a specific user
const getUserUrls = async (userId) => {
    return await urlRepository.findAllByUser(userId);
};

// Delete a URL — only if it belongs to the requesting user
const deleteUrl = async (id, userId) => {
    const deleted = await urlRepository.deleteUrl(id, userId);

    if (!deleted) {
        throw new ApiError(404, "URL not found or you are not authorised to delete it");
    }

    return deleted;
};

export const urlService = {
    shortenUrl,
    getOriginalUrl,
    getUserUrls,
    deleteUrl,
};
