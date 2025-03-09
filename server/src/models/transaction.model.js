import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    transactions: [
      {
        amount: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        }
      }
    ]
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transactions", transactionSchema);