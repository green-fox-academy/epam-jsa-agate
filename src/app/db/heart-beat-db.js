'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/heartbeat';

const checkDbHealth = function(res) {
  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection('heartbeat');
      collection.find({}).toArray(function(err, docs) {
        if (err === null && docs && docs.length>0) {
          res.json('{"status": "ok", "database": "ok"}');
        } else {
          res.json('{"status": "ok", "database": "error"}');
        }
      });
    } else {
      res.json('{"status": "ok", "database": "error"}');
    }
    db.close();
  });
};

module.exports = checkDbHealth;
