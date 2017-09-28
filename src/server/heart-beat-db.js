'use strict';
const config = require('../../.config.json');
const MongoClient = require('mongodb').MongoClient;
const url = `${config.db.url}:${config.db.port}/${config.db.databaseName}`;
const okStatus =  {status: 'ok',database: 'ok'};
const errorStatus = {status: 'ok',database: 'error'};

const checkDatabaseHealth = function(res) {
  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection('heartbeat');
      collection.find({}).toArray(function(err, docs) {
        if (err === null && docs.length > 0) {
          res.json(okStatus);
        } else {
          res.json(errorStatus);
        }
      });
    } else {
      res.json(errorStatus);
    }
    db.close();
  });
};

module.exports = checkDatabaseHealth;
