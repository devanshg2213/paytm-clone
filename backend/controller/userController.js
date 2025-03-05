import zod from "zod";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { JWT_SECRET } from "../config.js";
import { Account } from "../models/account.js";
const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
export const createUser = async (req, res) => {
  try {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "Incorrect inputs",
      });
    }
    const existingUser = await User.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res.json({
        message: "Email already taken",
      });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const userId = user._id;

    // Create new account for user

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
};
const loginSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
export const loginUser = async (req, res) => {
  try {
    const { success } = loginSchema.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "Incorrect inputs",
      });
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username}).select("+password");
    if (!user || user.password !== password) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while logging In",
    });
  }
};

const updateBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

export const updateUser = async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "Incorrect inputs",
      });
    }
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      }
    );
    res.json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    });
    res.json({
      user: users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
};
