import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUserByID = async (req, res) => {
    const { username } = req.params;

    // if (username !== req.user.username) return res.sendStatus(403);

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ 
                status: "error",
                message: "Error fetching user",
                error: {
                    description: "User not found"
                }
             });
        }

        res.status(200).json({
            status: "success",
            message: "User fetched successfully",
            data: user 
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

export const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        if (!updateUser) {
            return res.json({
                status: "error",
                message: "Invalid input",
                error: {
                    description: "format is invalid"
                }
            });
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error", 
            message: "Server error occurred", 
            error: {
                description: "An internal error occurred on the server"
            }
        });
    }
}

export const addUserSkill = async (req, res) => {
    try {
       
        const { username } = req.params
        const {skill} = req.body;
        const user = await User.findOne({username});
        const skillObj = await Skill.findOne({name: skill});
        
        if (!user) return res.status(404).json({message: "user tidak ditemukan"});
        if (!skillObj) return res.status(404).json({message: "skill tidak ditemukan"});

        // if (!user.skill) user.skill = new Skill({name: skill});

        user.skill = skillObj;

        await user.save();

       res.json({
        status: "success",
        message: "Skill updated successfully",
        data: user.skill
    });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "error", 
            message: "Server error occurred", 
            error: {
                description: "An internal error occurred on the server"
            }
        });
    }
}