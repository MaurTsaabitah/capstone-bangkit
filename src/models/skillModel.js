import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: { type: String, unique: true },
})

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;