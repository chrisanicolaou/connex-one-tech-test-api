const { fetchEpochTime } = require('../models/time.models');

exports.getEpochTime = (req, res) => {
  const result = fetchEpochTime();
  res.send({ epoch: result });
};
