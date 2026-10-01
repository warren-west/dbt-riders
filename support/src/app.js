const express = require('express')
const app = express()

const employeesRouter = require('./routes/employees')
const ticketsRouter = require('./routes/tickets')

app.use(express.json())

app.use('/employees', employeesRouter)
app.use('/tickets', ticketsRouter)

module.exports = app