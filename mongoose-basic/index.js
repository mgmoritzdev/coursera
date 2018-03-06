const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const dbName = 'conFusion';

mongoose.connect(url).then((conn) => {

  console.log('connected to server');

  let newDish = Dishes({
    name: 'pizzaria',
    description: 'bona pizzaria'
  });

  // const db = conn.db('conFusion');
  Dishes.collection
    .drop()
    .then((drop) => {
      console.log('Dropped collection');
    });

  newDish
    .save()
    .then((dish) => {
      console.log(dish.toString());
      return Dishes.find({}).exec();
    })
    .then((dishes) => {
      console.log(dishes.toString());
    })
    .catch((err) => {
      console.log(err);
    });
}).catch((err) => {
  console.log(err);
});
