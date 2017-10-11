const dbUtility = require('./db-utility');

const collectionName = 'login';

const creatTokenForExistedUser = function(username, callback) {
  const url = dbUtility.createDatabaseUrl();
  dbUtility.connectMongo(url, findUser(username, callback));
};

const findUser = function(username, callback) {
  return function(err, db) {
    if (err === null) {
      let collection = db.collection(collectionName);
      collection.find({username: username}).toArray(function(err, docs) {
        console.log('docs', docs);
        callback(docs[0].password);
      });
    } else {
      callback(500);
    }
  };
};

module.exports={
  creatTokenForExistedUser: creatTokenForExistedUser,
};

