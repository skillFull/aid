'use strict';
const mongoose = require('mongoose');

const Post = require('./PostSchema');
const User = require('./UserSchema');

mongoose.connect('mongodb://localhost:27017/aid', {useNewUrlParser: true, useUnifiedTopology: true});

const query = {
  // Write users new event collection
  writeEvent(body) {
    const regEvent = new Post({
      _id: new mongoose.Types.ObjectId,
      created_at: new Date(),
      place: {
        coordinates: {
          lat: 321312.31231,
          lng: 321312.31231,
        },
        country: 's',
        city_name: 'body.city_name',
      },
      user_name: 'body.user_name',
      favorite_count: 0,
      message: body.message,
    });

    regEvent.save((err) => {
      if (err) {
        console.error(err);
      }
      console.log('Write');
    });
  },

  // Get users event collection
  async getCollection() {
    const result = await Post.find({})
    .select('-_id -place -__v');
    return result;
  },
  // Registration new user in database
  async userRegistration(body) {
    
    try {
        const reqUser = new User({
          _id: new mongoose.Types.ObjectId,
					name: `${body.name} ${body.surname}`,
					screen_name: body.username,
					password: body.password,
        });
  
        reqUser.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('User save');
          }
        });
      
    } catch (error) {
     console.log("Error function userRegistration", error)
    }
  },

};

// class Post {

// 	writePost (data) {
// 		try {
// 			const regPost = new Post({
// 				_id: new mongoose.Types.ObjectId,
// 				created_at: new Date(),
// 				place: {
// 					coordinates: {
// 						lat: 321312.31231,
// 						lng: 321312.31231,
// 					},
// 					country: 's',
// 					city_name: 'body.city_name',
// 				},
// 				user_name: 'body.user_name',
// 				favorite_count: 0,
// 				message: body.message,
// 			});




// 		} catch (error) {
			
// 		}
// 	}

// }

module.exports = query;