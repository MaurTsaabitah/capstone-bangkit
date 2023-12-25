import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import skillRoutes from "./src/routes/skillRoutes.js";
import loggingMiddleware from "./src/middleware/logging.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { verifyToken } from "./src/middleware/authVerifyToken.js";
import  recommendationRoutes from "./src/routes/recommendationRoutes.js";

const app = express();

connectDB();

app.use(loggingMiddleware);
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true} ));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/auth', authRoutes);
app.use(verifyToken);
app.use('/api/users', userRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/predict', recommendationRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});