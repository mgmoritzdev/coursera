const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const dbName = 'conFusion';

mongoose.connect(url).then((conn) => {

  console.log('connected to server');

  Dishes.collection
    .drop()
    .then((drop) => {
      console.log('Dropped collection');
    });

  Dishes.create({
    name: 'pizzaria',
    description: 'bona pizzaria'
  }).then((dish) => {
    console.log(dish.toString());
    return Dishes.findByIdAndUpdate(
      dish._id,
      {
        $set: {description: 'Updated test'}
      },
      {
        new : true
      }).exec();
  }).then((dish) => {
    console.log(dish.toString());
    dish.comments.push({
      rating: 5,
      comment: 'good',
      author: 'Eddie'
    });

    return dish.save();
  }).then((dish) => {
    console.log(dish.toString());
    conn.disconnect();
  }).catch((err) => {
    console.log(err);
  });
}).catch((err) => {
  console.log(err);
});
