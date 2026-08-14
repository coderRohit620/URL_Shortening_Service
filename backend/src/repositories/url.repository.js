import { Url } from "../models/url.models.js";

/**
 * Repository Layer — Url
 * Responsibility: All Mongoose/DB queries for the Url collection.
 * No business logic here, only data access.
 */

// Create a new short URL document
const createUrl = async ({ full_url, short_url, user }) => {
    return await Url.create({ full_url, short_url, user });
};

// Find a URL document by its short code
const findByShortUrl = async (short_url) => {
    return await Url.findOne({ short_url });
};

// Increment the click counter for a given short code
const incrementClick = async (short_url) => {
    return await Url.findOneAndUpdate(
        { short_url },
        { $inc: { click: 1 } },
        { new: true }
    );
};

// Get all URLs created by a specific user
const findAllByUser = async (userId) => {
    return await Url.find({ user: userId }).sort({ createdAt: -1 });
};

// Delete a URL only if it belongs to the given user
const deleteUrl = async (id, userId) => {
    return await Url.findOneAndDelete({ _id: id, user: userId });
};

export const urlRepository = {
    createUrl,
    findByShortUrl,
    incrementClick,
    findAllByUser,
    deleteUrl,
};
