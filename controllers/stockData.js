const axios = require('axios')
const cheerio = require('cheerio')
// const { get } = require('cheerio/lib/api/traversing')

const getStockData = async (req, res) => {
    res.send('Stock data API')
}

const getHistoricalData = async (req, res) => {
    const { ticker } = req.params
try {
    const url = `https://finance.yahoo.com/quote/${ticker}/history?p=${ticker}`
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const companyName = $('div[id="quote-header-info"] h1').get().map(val => $(val).text())
    const prices = $('td:nth-child(6)').get().map(val => $(val).text())
    const dates = $('td:first-child').get().map(val => $(val).text())
    const perChange = $('#quote-header-info [data-field="regularMarketChangePercent"] span').text()
    const regHourTitle = $("#quote-market-notice span").text()
    res.status(200).send({companyName, prices, dates, perChange, regHourTitle})
} catch (error) {
    res.status(500).send({ message: error.message })
    }
}

const getStockSummary = async (req, res) => {
    const { ticker } = req.params;
    
    try {
        const url = `https://finance.yahoo.com/quote/${ticker}?p=${ticker}&.tsrc=fin-srch`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data)
        const priceSummary = $("#quote-summary div:first-child tbody tr td").get().map(val => $(val).text().trim()).join(' / ')
        const financeSummary = $("#quote-summary div:nth-child(2) tbody tr td").get().map(val => $(val).text().trim()).join(' * ')
        res.status(200).send({priceSummary, financeSummary})
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = { 
    getStockData, 
    getHistoricalData,
    getStockSummary
}