'use strict';
const MongoClient = require('mongodb').MongoClient;
const createDatabaseUrl = function() {
  const address = process.env.DB_URL;
  const port = process.env.DB_PORT;
  const databaseName = process.env.DB_NAME;
  return `${address}:${port}/${databaseName}`;
};

const postRegister = function(body, callback) {
  const url = createDatabaseUrl();
  MongoClient.connect(url, function(err, db) {
    const searchUserName = {username: body.username};
    console.log(searchUserName);
    if (err === null) {
      let collection = db.collection('register');
      collection.find(searchUserName).toArray(function(err, docs) {
        console.log(docs);
        if (docs.length > 0) {
          callback('409');
        } else {
          console.log(body)
          collection.insertOne(body, function(err, docs2) {
            console.log(err)
            callback('201');
            db.close();
          });
        }
      });
    } else {
      callback('500');
    }
  });
};

module.exports = {
  postRegister: postRegister,
};
