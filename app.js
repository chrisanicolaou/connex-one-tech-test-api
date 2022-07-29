const express = require('express');
const cors = require('cors');
const { getEpochTime } = require('./controllers/index');
require('dotenv').config();

const app = express();
const authHeader = process.env.MY_SECRET_TOKEN;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ error: 'No authorization credentials set!' });
  }
  if (req.headers.authorization !== authHeader) {
    return res
      .status(403)
      .send({ error: 'Incorrect authorization credentials!' });
  }
  next();
});

app.get('/api/time', getEpochTime);

module.exports = { app, authHeader };
