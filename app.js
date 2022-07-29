const express = require('express');
const cors = require('cors');
const promMid = require('express-prometheus-middleware');
const { getEpochTime } = require('./controllers/index');
require('dotenv').config();

/*
Main app responsible for serving endpoints to the client on request.
This API implements the MVC design pattern. I was able to complete the
API with linting, unit tests and some CI/CD. Given more time, I would have
liked to improve the error handling and implement a linter and testing
into the frontend.
*/
const app = express();

// Since the client needs a secret auth token, loads the required
// auth token from an environment variable.
const authHeader = process.env.MY_SECRET_TOKEN;

app.use(cors());

app.use(express.json());

// Middleware responsible for checking that any requests have the
// correct authorization token.
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

// Configures the prom-client
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

// Handles any incorrect paths from an authorized client
app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Path not found' });
});

module.exports = { app, authHeader };
