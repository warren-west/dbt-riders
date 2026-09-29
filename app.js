const express = require('express');
const app = express();

app.use(express.json());

const indexRouter = require('./routes/index');
const healthRouter = require('./routes/health');

app.use('/', indexRouter);
app.use('/health', healthRouter);

module.exports = app;
