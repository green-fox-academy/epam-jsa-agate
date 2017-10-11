'use strict';
const MongoClient = require('mongodb').MongoClient;

const createDatabaseUrl = function(addressEnv, portEnv, dataEnv) {
  const address = process.env.DB_URL || process.env.addressEnv;
  const port = process.env.DB_PORT || process.env.portEnv;
  const databaseName = process.env.DB_NAME || process.env.dataEnv;
  return `${address}:${port}/${databaseName}`;
};

const insertFileToDatabase = function(requiredJsonfile,collectionName) {
  const url = createDatabaseUrl();
  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection(collectionName);
      collection.find({}).toArray(function(err, docs) {
        if (err === null && docs.length > 0) {
          db.close();
        } else {
          collection.insert(requiredJsonfile, function(err, r) {
            console.log('err', err, 'result', r);
            if (err === null) {
              db.close();
            }
          });
        }
      });
    } else {
      db.close();
    }
  });
};

module.exports = {
  createDatabaseUrl: createDatabaseUrl,
  insertFileToDatabase: insertFileToDatabase,
};