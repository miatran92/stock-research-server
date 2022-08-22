const express = require('express')
const router = express.Router()
const { 
    getStockData, 
    getHistoricalData,
    getStockSummary
    } = require('../controllers/stockData')

router.get('/', getStockData)
router.get('/:ticker', getHistoricalData)
router.get('/stocks/:ticker', getStockSummary)

module.exports = router;