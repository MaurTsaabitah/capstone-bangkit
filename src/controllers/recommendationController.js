import axios from "axios";
import User from "../models/userModel.js";
import Recommendation from "../models/recommendationModel.js";

export const createRecommendationController = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) return res.send(404).json({
            status: "error",
            message: "user not found"
        });

        const userSkill = user.skill;

        const responseModel = await axios.post("https://career-recommendation-model-id-t6yukwntwq-et.a.run.app/predict", {skills: userSkill});
        const predictResult = responseModel.data.data;

        console.log(predictResult.predictect_category);

        const existingRecommendationUser = await Recommendation.findOne({userId: user._id});

        if (existingRecommendationUser) return res.status(400).json({
            status: 'error', 
            message: "existing user recommendation career"
        }); 

        const recommendation = new Recommendation({
            userId: user._id,
            skill: user.skill,
            recommendation: predictResult.predictect_category
        });
        
        await recommendation.save();

        res.json({
            status: "success",
            message: "Recommendation career updated successfully",
            data: predictResult
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