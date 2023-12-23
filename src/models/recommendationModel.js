import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    recommendation: String 
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;