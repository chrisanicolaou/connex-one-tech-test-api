const express = require('express');

const app = express();
const cors = require('cors');

const { getTest } = require('./controllers/index');

app.use(cors());

app.use(express.json());

app.get('/api/test', getTest);

module.exports = { app };
