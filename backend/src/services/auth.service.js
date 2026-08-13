import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email")
    }

    const user = await User.create({
        name, email, password,
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid Email or Password")
    }

    return user;
};

export {
    registerUser,
    loginUser,
};

