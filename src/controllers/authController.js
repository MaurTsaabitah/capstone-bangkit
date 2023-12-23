import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userValidationLogin, userValidationRegister } from "../validations/userValidation.js";

// REGISTER
export const createUser = async (req, res) => {
    try {
        const { 
            username, 
            email, 
            password, 
            full_name, 
            date_of_birth,
            profile_image,
            phone_number,
            education, 
        } = req.body;

        const { error, value } = userValidationRegister.validate(req.body);

        const doesExist = await User.findOne({ username: value.username });

        if (doesExist) return res.status(400).json({ message: `${username} sudah ada` });

        if (error) return res.status(400).json({error: error.details[0].message});

        // Hash Password
        const hashPassword = await bcrypt.hash(value.password, 10);

        const newUser = new User({...value, password: hashPassword});

        const data = await newUser.save();

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data
        })
    } catch (error) {
        res.status(500).json({
            status: "error", 
            message: "Server error occurred", 
            error: {
                description: "An internal error occurred on the server"
            }
        });
    }    
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const { error, value } = userValidationLogin.validate(req.body);

        if (error) return res.status(400).json({error: error.details[0].message})

        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({message: "email dan password salah"});

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) return res.status(401).json({message: "email dan password salah"});

        const accessToken = jwt.sign({
            id: user._id,
            username: user.username 
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        const refreshToken = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "3d"});

        user.refresh_token = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            status: "success",
            message: "Login successful", 
            token: accessToken
        });
    } catch (error) {
       res.status(500).json({
            status: "error", 
            message: "Server error occurred", 
            error: {
                description: "An internal error occurred on the server"
            }
       });
    }
}

export const logoutUser = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.status(401).json({message: "Refresh token not provided"});

    await User.updateOne({ refresh_token: refreshToken }, { $set: { refresh_token: null } });
        
    res.clearCookie('refreshToken');

    return res.json({ 
        status: "success",
        message: "Logout successful" 
    });
}