import axios from "axios";
import User from "../models/userModel.js";
import Recommendation from "../models/recommendationModel.js";

export const createRecommendationController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) return res.send(404).json({
            status: "error",
            message: "user not found"
        });

        const userSkill = user.skill;

        const responseModel = await axios.post("https://career-recommendation-model-id-t6yukwntwq-et.a.run.app/predict", {skills: userSkill});
        const predictResult = responseModel.data.data;

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

export const getRecommendationControllerById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            status: "error",
            message: "Error fetching user",
            error: {
                description: "User not found"
            }
        });

    const recommendation = await Recommendation.findOne({userId: id});

    if (!recommendation) return res.status(404).json({
        status: "error",
        message: "Error fetching recommendation",
        error: {
            description: "recommendation user not found"
        }
    });

    res.json({
        status: "success",
        message: "Recommendation user fetched successfully",
        data: {
            user, 
            recommendation
        }
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

export const deleteRecommendationController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            status: "error",
            message: "Error fetching user",
            error: {
                description: "User not found"
            }
        });

        const recommendation = await Recommendation.findOne({userId: id});

        if (!recommendation) return res.status(404).json({
            status: "error",
            message: "Error fetching recommendation",
            error: {
                description: "recommendation user not found"
            }
        });

        await recommendation.deleteOne({userId: id});

        res.json({
            status: "success",
            message: "Recommendation user delete successfully",
            data: recommendation
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