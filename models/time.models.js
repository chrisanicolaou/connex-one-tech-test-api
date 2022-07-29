// Returns current Epoch time in seconds
exports.fetchEpochTime = () => {
  const date = new Date();
  return Math.floor(date.getTime() / 1000);
};
