const mongoose = require('mongoose');
const db = 'mongodb+srv://dbCaryn:work@cluster0.18kht.mongodb.net/Games?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Error connecting to database: ', error);
  });

const schema = mongoose.Schema({
  title: { type: String },
  name: { type: String },
  released: { type: String },
  updated: { type: String },
  background_image: { type: String },
  rating: { type: String },
  website: { type: String }
});

const Games = mongoose.model('Games', schema, 'gameInfo');

module.exports = Games;
