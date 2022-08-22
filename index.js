const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const stockDataRoutes = require('./routes/stockDataRoutes')
const topMoversRoutes = require('./routes/topMoversRoutes')

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', stockDataRoutes)
app.use('/overview', topMoversRoutes)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))