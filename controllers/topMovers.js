const axios = require('axios')
const cheerio = require('cheerio')

//BIGGEST MOVERS TODAY
// most actives
// gainers
// losers
const getMovers = async (req, res) => {
    const { type } = req.params
    try {
        const url = `https://finance.yahoo.com/${type}`
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        const topMovers = $('tr').get().map(val => {
           const $ = cheerio.load(val)
           const keyVals = $('td').get().map(val => $(val).text())
           console.log(keyVals)
           return keyVals
        })
        res.status(200).send({ type, topMovers })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

//S&P500, DOW, NASDAQ
const getMarketData = async (req, res) => {
    try {
        const {data} = await axios.get('https://finance.yahoo.com/gainers')
        const $ = cheerio.load(data)

        const marketOverview = $('div[id="market-summary"] ul li').get().map(val => {
        const $ = cheerio.load(val)
        const keyVals = $('a,fin-streamer').get().map(val => $(val).text())
        return keyVals
    })
    res.send(marketOverview)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}
module.exports = { getMovers, getMarketData }