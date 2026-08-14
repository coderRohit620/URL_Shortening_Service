import { ApiError } from "../utils/ApiError.js";
import { authRepository } from "../repositories/auth.repository.js";

/**
 * Service Layer — Auth
 * Responsibility: Business logic for authentication.
 * Calls authRepository for DB operations. No req/res here.
 */

// Register a new user
const registerUser = async ({ name, email, password }) => {
    const existingUser = await authRepository.findByEmail(email);

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    const user = await authRepository.createUser({ name, email, password });
    return user;
};

// Validate credentials and return the user
const loginUser = async ({ email, password }) => {
    const user = await authRepository.findByEmail(email);

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    return user;
};

// Generate access + refresh tokens and persist refresh token
const generateTokens = async (userId) => {
    const user = await authRepository.findById(userId);

    if (!user) {
        throw new ApiError(500, "User not found while generating tokens");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await authRepository.updateRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
};

// Clear refresh token on logout
const logoutUser = async (userId) => {
    await authRepository.clearRefreshToken(userId);
};

export const authService = {
    registerUser,
    loginUser,
    generateTokens,
    logoutUser,
};
