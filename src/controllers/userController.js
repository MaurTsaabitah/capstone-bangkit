import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUserByID = async (req, res) => {
    const { username } = req.params;

    if (username !== req.user.username) return res.sendStatus(403);

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ 
                status: "error",
                message: "user not found"
             });
        }

        res.status(200).json({
            status: "success",
            data: user 
        })

    } catch (error) {
        res.status(500).json({ 
            status: "error", 
            message: error.message });
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

        res.status(200).json({data: updatedUser});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}