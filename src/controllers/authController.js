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

        if (doesExist) return res.status(400).json({ message: `${username} is already been registered` });

        if (error) return res.status(400).json({error: error.details[0].message});

        // Hash Password
        const hashPassword = await bcrypt.hash(value.password, 10);

        const newUser = new User({...value, password: hashPassword});

        const data = await newUser.save();

        res.status(201).json({
            success: true,
            message: "Register success",
        })
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: "Register fail"
        })
    }    
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const { error, value } = userValidationLogin.validate(req.body);

        if (error) return res.status(400).json({error: error.details[0].message})

        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({message: "Wrong email and password"});

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) return res.status(401).json({message: "Wrong email and password"});

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
            message: "successful login", 
            accessToken
        });
    } catch (error) {
       res.status(500).json({message: error.message});
    }
}

export const logoutUser = async (req, res) => {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) return res.sendStatus(204);

    const user = await User.findOne({refresh_token: refreshToken});

    if (!user) return res.status(204).json({message: "Not match"});
    
    await User.findByIdAndUpdate(user._id, {$set: {refresh_token: null}});
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}