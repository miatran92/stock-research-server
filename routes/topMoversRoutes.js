const express = require('express');
const router = express.Router()
const { getMovers, getMarketData } = require('../controllers/topMovers');


router.get('/movers/:type', getMovers)
router.get('/market', getMarketData)

module.exports = router;