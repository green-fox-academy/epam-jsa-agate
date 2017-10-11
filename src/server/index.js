const express = require('express');
const DatabaseHealth = require('./database-check');
const BusinessessEndpoint = require('./business-endpoint');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};

const apiErrorMessage = {error: 'something wrong with database server'};

app.get('/heartbeat', function(req, res) {
  DatabaseHealth.checkDatabaseHealth((isWorking) => {
    isWorking ? res.json(okStatus) :
      res.json(errorStatus);
  });
});

app.get('/api/businesses', function(req, res) {
  BusinessessEndpoint.apiBusinessesGET((isWorking, docs) => {
    if (isWorking) {
      let businesses = docs[0].businesses;
      res.status(200).json(businesses);
    } else {
      res.status(500).json(apiErrorMessage);
    }
  });
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
