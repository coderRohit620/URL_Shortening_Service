import { User } from "../models/user.model.js";

/**
 * Repository Layer — User
 * Responsibility: All Mongoose/DB queries for the User collection.
 * No business logic here, only data access.
 */

// Find a user by email (includes password field for auth checks)
const findByEmail = async (email) => {
    return await User.findOne({ email }).select("+password");
};

// Create a new user document
const createUser = async ({ name, email, password }) => {
    return await User.create({ name, email, password });
};

// Find a user by ID (full document with password, for token generation)
const findById = async (id) => {
    return await User.findById(id);
};

// Find a user by ID — safe projection (no password, no refreshToken)
const findByIdSafe = async (id) => {
    return await User.findById(id).select("-password -refreshToken");
};

// Save the refresh token on the user document
const updateRefreshToken = async (id, refreshToken) => {
    const user = await User.findById(id);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
};

// Remove the refresh token on logout
const clearRefreshToken = async (id) => {
    return await User.findByIdAndUpdate(
        id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );
};

export const authRepository = {
    findByEmail,
    createUser,
    findById,
    findByIdSafe,
    updateRefreshToken,
    clearRefreshToken,
};
