const express = require('express');
const cors = require('cors');
const promMid = require('express-prometheus-middleware');
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

app.use(
  promMid({
    metricsPath: '/api/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  }),
);

app.get('/api/time', getEpochTime);

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Path not found' });
});

module.exports = { app, authHeader };
