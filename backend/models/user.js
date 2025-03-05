import mongoose from "mongoose";
// import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLenght: 3,
    maxLenght: 30,
  },
  password: {
    type: String,
    select: false,
    required: true,
    minLenght: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 30,
  },
});

export const User = mongoose.model("User", userSchema);
