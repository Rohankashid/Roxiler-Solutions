// backend/controllers/statisticsController.js
const Transaction = require('../models/transactionModel');

exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    const totalSale = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: month, $options: 'i' }, sold: true } },
      { $group: { _id: null, totalAmount: { $sum: '$price' } } },
    ]);

    const soldCount = await Transaction.countDocuments({
      dateOfSale: { $regex: month, $options: 'i' },
      sold: true,
    });

    const notSoldCount = await Transaction.countDocuments({
      dateOfSale: { $regex: month, $options: 'i' },
      sold: false,
    });

    res.json({
      totalSale: totalSale[0] ? totalSale[0].totalAmount : 0,
      soldCount,
      notSoldCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
