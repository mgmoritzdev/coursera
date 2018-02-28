const assert = require('assert');

const insertDocument = (conn, document, collection) => {
  const db = conn.db('conFusion');
  return db.collection(collection).insert(document);
};

const findDocuments = (conn, collection) => {
  const db = conn.db('conFusion');
  return db.collection(collection)
    .find({}).toArray();
};

const removeDocument = (conn, document, collection) => {
  const db = conn.db('conFusion');
  return db.collection(collection)
    .deleteOne(document);
};

const updateDocument = (conn, document, update, collection) => {
  const db = conn.db('conFusion');
  return db.collection(collection)
    .updateOne(document, {$set: update}, null);
};

const dropCollection = (conn, collection) => {
  const db = conn.db('conFusion');
  return db.dropCollection(collection);
};

const operations = {
  insertDocument,
  findDocuments,
  removeDocument,
  updateDocument,
  dropCollection
};

module.exports = operations;
