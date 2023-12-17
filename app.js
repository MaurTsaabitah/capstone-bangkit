import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import loggingMiddleware from "./src/middleware/logging.js";
import cors from "cors";
import "dotenv/config";

const app = express();

connectDB();

app.use(loggingMiddleware);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true} ));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});