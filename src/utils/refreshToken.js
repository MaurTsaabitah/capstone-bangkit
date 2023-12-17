import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        
        if (!refreshToken) return res.status(401).json({message: "You are not authenticated"});
        
        const user = await User.findOne({refresh_token: refreshToken});
        
        if(!user) return res.status(403).json({message: "You are not allowed"});

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) return res.status(403).json({message: "You are not allowed"});
            const accessToken = jwt.sign({
                id: user._id,
                username: user.username
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});
            res.json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({message: error});
    }
}