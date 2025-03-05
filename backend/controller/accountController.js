import mongoose from "mongoose";
import { Account } from "../models/account.js";
export const fetchBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    if (!account) {
      return res.json({
        message: "Account not found",
      });
    }
    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error in fetching balance",
    });
  }
};

export const transfer = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    // fetch accounts within the transaction
    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.json({
        message: "Insufficient balance",
      });
    }
    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.json({
        message: "Account not found",
      });
    }
    // perform transfer
    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);
    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);
    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error in transferring balance",
    });
  }
};
