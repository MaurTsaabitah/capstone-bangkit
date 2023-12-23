import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be Unique'],
        minlength: [8, 'Username must be at least 8 characters.'],
        maxlength: [30, 'Username must be at least 30 characters.']
    },
    email: {
        type: String,
        required: [true, 'Username is required.'],
        unique: [true, 'email must be Unique'],
        lowercase: true, 
        validate: {
            validator: (value) => /^\S+@\S+\.\S+$/.test(value), // Validasi alamat email
            message: 'Format email tidak valid',
          },
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'password must be at least 8 characters.']
    },
    full_name: {
        type: String,
        required: true,
        minlength: [8, 'password must be at least 8 characters.']
    },   
    date_of_birth: {
        type: Date,
        required: true
    },
    phone_number: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: [true, 'Phone number must be Unique'],
        validate: {
            validator: (value) => /^\d{10,14}$/.test(value), // Validasi nomor telepon (10 hingga 14 digit)
            message: 'Format nomor telepon tidak valid',
          },
    },
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    refresh_token: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;