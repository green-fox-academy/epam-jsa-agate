'use strict';

const MongoClient = require('mongodb').MongoClient;

const createDatabaseUrl = function() {
  const address = process.env.DB_URL;
  const port = process.env.DB_PORT;
  const databaseName = process.env.DB_NAME;

  return `${address}:${port}/${databaseName}`;
};

const checkDatabaseHealth = function(callback) {
  const url = createDatabaseUrl();
  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection('heartbeat');
      collection.find({}).toArray(function(err, docs) {
        if (err === null && docs.length > 0) {
          callback(true);
        } else {
          console.log('Connected now.');
          callback(false);
        }
      });
    } else {
      console.log('Not connected.');
      callback(false);
    }
    db.close();
  });
};

module.exports = {
  checkDatabaseHealth: checkDatabaseHealth,
};
