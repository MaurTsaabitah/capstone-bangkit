import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import "dotenv/config";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true} ));

app.use('/api/users', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});