const mongodb = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'conFusion';

const client = mongodb.MongoClient;

client.connect(url, (err, conn) => {
  assert.equal(err, null);
  console.log('Connected to mongo server');
  const db = conn.db(dbName);

  const collection = db.collection('dishes');

  collection.insertOne(
    {name: 'pizza', description: 'fat'},
    (err, result) => {
      assert.equal(err, null);
      console.log('Just inserted');
      console.log(result.ops);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log('Found:');
        console.log(docs);

        db.dropCollection('dishes', (err, result) => {
          assert.equal(err, null);
          conn.close();
        });
      });
    });
});
