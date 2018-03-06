const mongodb = require('mongodb');
const assert = require('assert');

const db = require('./operations');

const url = 'mongodb://localhost:27017';
const dbName = 'conFusion';

const client = mongodb.MongoClient;

client.connect(url, (err, conn) => {
  assert.equal(err, null);
  console.log(`conn: ${conn}`);

  db.insertDocument(conn, {name: 'beleza', description: 'blah'}, 'dishes', (result) => {
    console.log(`inserted doc: ${result.ops}`);

    db.findDocuments(conn, 'dishes', (docs) => {
      console.log(`found: ${docs}`);

      db.updateDocument(conn, {name: 'beleza'}, {description: 'updated'}, 'dishes', (result) => {
        console.log(`update: ${result}`);

        db.findDocuments(conn, 'dishes', (docs) => {
          console.log(`found: ${docs}`);

          db.dropCollection(conn, 'dishes', (result) => {
            console.log(`Dropped collection? ${result}`);
            conn.close();
          });
        });
      });
    });
  });
});
