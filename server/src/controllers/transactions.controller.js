import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";

// Add a new transaction
export const addTransaction = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    // Validate required fields
    if (!amount || !description || !category || !date) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: amount, description, category, date",
      });
    }

    // Find user in database
    const user = await Transaction.findById(req.user._id);
    
    if (!user) {
      // Create new user if not found
      const newUser = await Transaction.create({
        _id: req.user._id,
        transactions: [{
          amount,
          description,
          category,
          date: new Date(date)
        }]
      });
      
      return res.status(201).json({
        success: true,
        message: "User created and transaction added successfully",
        data: newUser.transactions[0]
      });
    }
    
    // If user exists, add transaction to their transactions array
    const newTransaction = {
      amount,
      description,
      category,
      date: new Date(date)
    };
    
    // Add transaction to user's transactions array
    user.transactions.push(newTransaction);
    await user.save();
    
    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      data: newTransaction
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add transaction",
      error: error.message
    });
  }
};

// Edit an existing transaction
export const editTransaction = async (req, res) => {
  try {
    // const { transactionId } = req.params;
    const { amount, description, category, date, transactionId } = req.body;
    const userWithTransactions = await Transaction.findById(req.user._id);
    if (!userWithTransactions) {
      return res.status(404).json({
        success: false,
        message: "User record not found",
      });
    }
    console.log(transactionId)
    // Find transaction and verify ownership
    const transactionIndex = userWithTransactions.transactions.findIndex(
      transaction => transaction._id.toString() === transactionId
    );
    const transaction = userWithTransactions.transactions[transactionIndex];
    console.log(transaction)
    if (transactionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }


    // Update transaction fields
    if (amount !== undefined) transaction.amount = amount;
    if (description !== undefined) transaction.description = description;
    if (category !== undefined) transaction.category = category;
    if (date !== undefined) transaction.date = new Date(date);

    // Save updated transaction
    await userWithTransactions.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update transaction",
      error: error.message,
    });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;

    // Find the user with their transactions
    const userWithTransactions = await Transaction.findById(req.user._id);
    
    if (!userWithTransactions) {
      return res.status(404).json({
        success: false,
        message: "User record not found",
      });
    }
    
    // Check if the transaction exists in the user's transactions array
    const transactionIndex = userWithTransactions.transactions.findIndex(
      transaction => transaction._id.toString() === transactionId
    );
    
    if (transactionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    
    // Remove the transaction from the array
    userWithTransactions.transactions.splice(transactionIndex, 1);
    
    // Save the updated user document
    await userWithTransactions.save();
    
    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
};

// Get all transactions for the current user
export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findById(req.user._id).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve transactions",
      error: error.message,
    });
  }
};
