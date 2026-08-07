import { loginUser, registerUser } from "../services/auth.service"
import genrateToken from "../utils/genrateToken";


const register = async(req, res, next) =>{
    try {
        const user = await registerUser(req.body);
        const token = genrateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        next(error);
    }
}

const login = async(req,res,next) =>{
    try {
        const user = await loginUser(req.body);
        const token = genrateToken(user._id);

        res.status(200).json({
            success:true,
            token,user,
        })
    } catch (error) {
        next(error)
    }
}