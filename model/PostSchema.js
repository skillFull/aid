const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const Post = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  post_id: String,
  created_at: Date,
  place: {
    coordinates: {
      lat: mongoose.Schema.Types.Decimal128,
      lng: mongoose.Schema.Types.Decimal128,
    },
    country: String,
    city_name: String,
  },
  user_name: String,
  message: String,
  images: [{
    name: String,
    url: String,
  }],
  favorite_count: Number,
});

module.exports = mongoose.model('posts', Post);
