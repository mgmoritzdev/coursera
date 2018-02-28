const assert = require('assert');

const insertDocument = (conn, document, collection, callback) => {
  const db = conn.db('conFusion');
  db.collection(collection).insert(document, (err, result) => {
    assert.equal(err, null);
    console.log(`${result.result.n} inserted into collection ${collection}`);
    callback(result);
  });
};

const findDocuments = (conn, collection, callback) => {
  const db = conn.db('conFusion');
  db.collection(collection)
    .find({}).toArray((err, docs) => {
      assert.equal(err, null);
      callback(docs);
    });
};

const removeDocument = (conn, document, collection, callback) => {
  const db = conn.db('conFusion');
  db.collection(collection)
    .deleteOne(document, (err, result) => {
      assert.equal(err, null);
      console.log(`Removed the document ${document}`);
      callback(result);
    });
};

const updateDocument = (conn, document, update, collection, callback) => {
  const db = conn.db('conFusion');
  db.collection(collection)
    .updateOne(document, {$set: update}, null, (err, result) => {
      assert.equal(err, null);
      console.log();
      callback(result);
    });
};

const dropCollection = (conn, collection, callback) => {
  const db = conn.db('conFusion');
  db.dropCollection(collection, (err, result) => {
    assert.equal(err, null);
    callback(result);
  });
};

const operations = {
  insertDocument,
  findDocuments,
  removeDocument,
  updateDocument,
  dropCollection
};

module.exports = operations;
