import mongoose from "mongoose";

const predictJobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    predictedCategory: String 
});

const Job = mongoose.model('Job', predictJobSchema);

export default Job;