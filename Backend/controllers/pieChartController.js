// backend/controllers/pieChartController.js
const Transaction = require('../models/transactionModel');

exports.getPieChart = async (req, res) => {
  const { month } = req.query;

  try {
    const categories = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: month, $options: 'i' } } },
      { $group: { _id: '$category', itemCount: { $sum: 1 } } },
    ]);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
