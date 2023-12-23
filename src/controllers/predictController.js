import axios from "axios";
import User from "../models/userModel.js";

export const predictCareerController = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) return res.sendStatus(404);

        const userSkill = user.skill;

        const responseModel = await axios.post("https://career-recommendation-model-id-t6yukwntwq-et.a.run.app/predict", {skills: userSkill});
        const predictResult = responseModel.data.data;

        
        res.json({data: predictResult})
    } catch (error) {
        res.status(500).json({message: "kesalahan pada server"});
    }
}