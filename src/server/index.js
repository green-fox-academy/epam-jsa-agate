const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const checkDatabaseHealth = require('./heart-beat-db');

app.get('/heartbeat', function(req, res) {
  checkDatabaseHealth(res);
  });

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
