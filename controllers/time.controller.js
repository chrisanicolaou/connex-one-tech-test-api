const { fetchEpochTime } = require('../models/time.models');

// Fetches the epoch time from the model and sends to the client
exports.getEpochTime = (req, res) => {
  const result = fetchEpochTime();
  res.send({ epoch: result });
};
