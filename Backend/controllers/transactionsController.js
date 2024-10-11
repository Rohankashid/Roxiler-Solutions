// backend/controllers/transactionsController.js
const Transaction = require('../models/transactionModel');

// List transactions with pagination and search
exports.getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;
  const query = {
    dateOfSale: { $regex: month, $options: 'i' },
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: { $regex: search, $options: 'i' } },
    ],
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    const count = await Transaction.countDocuments(query);
    res.json({ transactions, totalPages: Math.ceil(count / perPage) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
