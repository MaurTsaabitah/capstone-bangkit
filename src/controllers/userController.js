import User from "../models/userModel.js";
import bcrypt from "bcrypt";


const createUser = async (req, res) => {
    const { username, 
            email, 
            password, 
            full_name, 
            date_of_birth,
            profile_image,
            education } = req.body

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPassword, full_name, date_of_birth, profile_image, education })
}