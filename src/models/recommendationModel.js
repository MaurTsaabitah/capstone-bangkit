import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    careerTitle: {
        type: String, 
        required: true
    }
});

const RecommendationModel = mongoose.model('Recommendation', recommendationSchema);

export default RecommendationModel;