import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error connection to MongoDB ${error}`);
    }
}

export default connectDB;
