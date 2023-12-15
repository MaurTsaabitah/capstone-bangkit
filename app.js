import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import loggingMiddlewarere from "./src/middleware/logging.js";
import "dotenv/config";

const app = express();

connectDB();

app.use(loggingMiddlewarere);
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});