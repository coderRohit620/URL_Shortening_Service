import User from "../models/user.model.js"

const registerUser = async({name,email,password}) =>{
    const exists = await User.findOne({email });
    if(exists){
        throw new Error("Email already Exists");
    }

    const user = await User.create({
        name,email,password,
    });

    return user;
};

const loginUser = async ({email,password}) =>{
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new Error("Invalid email or password");
    }

    const isMatch = await user.isPasswordCorrect(password);

    if(!isMatch){
        throw new Error("Invalid Email or Password")
    }

    return user;
};

export {registerUser,loginUser}

