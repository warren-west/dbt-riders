const express = require('express')
const app = express()

app.use(express.json())

const indexRouter = require('./routes/index')
const healthRouter = require('./routes/health')
const seedRouter = require('./routes/seeds')
const rideRouter = require('./routes/rides')

app.use('/', indexRouter)
app.use('/health', healthRouter)
app.use('/seed', seedRouter)
app.use('/rides', rideRouter)

module.exports = app
