const express = require('express');
const checkDbHealth = require('./src/app/db/heart-beat-db');
const app = express();

app.get('/heartbeat', function(req, res) {
  checkDbHealth(res);
});

app.listen(3449, function() {
  console.log('epam-jsa-agate is running on port 3449!\n');
});
