'use strict';
const MongoClient = require('mongodb').MongoClient;
const createDatabaseUrl = function() {
  const address = process.env.DB_URL;
  const port = process.env.DB_PORT;
  const databaseName = process.env.DB_NAME;
  return `${address}:${port}/${databaseName}`;
};

// const findUser = function(body, callback) {
//   return function(err, db) {
//     if (err === null) {
//       db.collection(collectionName).findOne({username: body.username},
//         function(err, docs) {
//           if (docs !== null) {
//             const reqPassword = body.password;
//             const queryPassword = docs.password;
//             verifyPassword(reqPassword, queryPassword, callback);
//           } else {
//             return callback(loginStatusCode.MISSING_CREDENTIALS);
//           }
//         });
//     } else {
//       return callback(loginStatusCode.WRONG_SERVER);
//     }
//   };
const handleInfo = function(userName, hashPassword, callback) {
  const url = createDatabaseUrl();
  MongoClient.connect(url, function(err, db) {
    const filter = {username: userName};
    if (err === null) {
      let collection = db.collection('register');
      collection.findOne(filter, function(err, docs) {
        if (docs !== null) {
          callback('409');
        } else {
          collection.insertOne({username: userName, password: hashPassword}, function(err, docs2) {
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
  handleInfo: handleInfo,
};
