import { string } from "joi";
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: {
        type: string,
        required: true
    }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;