const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const User = mongoose.Schema( {
  _id: mongoose.Schema.Types.ObjectId,
  user_id: String,
  email: String,
  password: 'String',
  created_at: Date,
  name: String,
  avatar: {
    name: String,
    path: String,
  },
  screen_name: String,
  location: String,
  url: String,
  frends_count: Number,
  frends_urls: [String],
  favourites_count: Number,
  favourites_urls: [String],
});

module.exports = mongoose.model('users', User);
