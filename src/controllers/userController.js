import User from "../models/userModel.js";

export const getUserByID = async (req, res) => {
    const { username } = req.params

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