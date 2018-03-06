const mongodb = require('mongodb');
const assert = require('assert');

const db = require('./operations');

const url = 'mongodb://localhost:27017';
const dbName = 'conFusion';

const client = mongodb.MongoClient;

client.connect(url)
  .then((conn) => {
    console.log(`conn: ${conn}`);

    db.insertDocument(conn, {name: 'beleza', description: 'blah'}, 'dishes')
      .then((result) => {
        console.log(`inserted doc: ${result.ops}`);

        return db.findDocuments(conn, 'dishes');
      })
      .then((docs) => {
        console.log(`found: ${docs}`);

        return db.updateDocument(conn, {name: 'beleza'}, {description: 'updated'}, 'dishes');
      })
      .then((result) => {
        console.log(`update: ${result}`);

        return db.findDocuments(conn, 'dishes');
      })
      .then((docs) => {
        console.log(`found: ${docs}`);

        return db.dropCollection(conn, 'dishes');
      })
      .then((result) => {
        console.log(`Dropped collection? ${result}`);
        conn.close();
      })
      .catch((err) => console.log(err));
  }, (err) => console.log(err))
  .catch((err) => console.log(err));
