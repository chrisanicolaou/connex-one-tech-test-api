const { app } = require('./app');

/*
Script that runs on start, opening the API to listen for connections
*/
const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
});
