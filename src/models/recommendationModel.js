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

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;