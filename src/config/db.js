import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/getmecareer_dev');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error connection to MongoDB ${error}`);
    }
}

export default connectDB;
