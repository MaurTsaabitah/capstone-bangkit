import RecommendationModel from "../models/recommendationModel.js";

export const getRecommendation = async (req, res) => {
    try {
        const userId = req.params.id;
        const userRecommendation = await RecommendationModel.find({ userId });
        res.json({ success: true, userRecommendation });
    } catch (error) {
        res.status(500).json({success: false, message: "Gagal mendapatkan rekomendasi karir"})
    }
}
