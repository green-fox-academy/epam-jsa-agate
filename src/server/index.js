const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const DatabaseHealth = require('./database-check');

app.get('/heartbeat', function(req, res) {
  DatabaseHealth.checkDatabaseHealth(res,DatabaseHealth.databaseResponse);
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
