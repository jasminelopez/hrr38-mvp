const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('error'));

let restaurantSchema = mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  imagePath: {type: String, required: true},
  name: {type: String, required: true},
  price: {type: String, required: true},
  rating: {type: String, required: true},
  review_count: {type: String, required: true},
  location: {type: String, required: true},
  url: {type: String, required: true}
});

let Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports.Restaurant = Restaurant;