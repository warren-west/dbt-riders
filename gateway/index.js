require('dotenv').config()

const express = require('express')
const proxy = require('express-http-proxy')

const app = express()
const port = process.env.PORT || 3000

app.use('/drives', proxy('http://localhost:3001'))
app.use('/support', proxy('http://localhost:3002'))

app.listen(port, () => {
    console.log(`Gateway is listening on port ${port}...`)
})