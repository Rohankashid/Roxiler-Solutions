// backend/models/transactionModel.js
const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  dateOfSale: Date,
  sold: Boolean,
});

module.exports = mongoose.model('Transaction', transactionSchema);
