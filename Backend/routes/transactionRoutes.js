// backend/routes/transactionRoutes.js
const express = require('express');
const {
  getTransactions,
} = require('../controllers/transactionsController');
const { getStatistics } = require('../controllers/statisticsController');
const { getBarChart } = require('../controllers/barChartController');
const { getPieChart } = require('../controllers/pieChartController');

const router = express.Router();

router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);

module.exports = router;
