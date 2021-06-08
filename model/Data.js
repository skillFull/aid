'use strict'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aid', {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: String,
    email: String,
    created_at: Date,
    name: String,
    avatar: {
        name: String,
        path: String
    },
    screen_name: String,
    location: String,
    url: String,
    frends_count: Number,
    frends_urls: [String],
    favourites_count: Number,
    favourites_urls:[String]
});

const user = mongoose.model('users', User);

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
        city_name: String
    },
    user_name: String,
    message: String,
    images: [{
        name: String,
        url: String
    }],
    favorite_count: Number,
})

const post = mongoose.model('posts', Post)

const query = {
    // Write users new event collection 
    writeEvent (body) {

        const regEvent = new post({
            _id: new mongoose.Types.ObjectId,
            place:{
                coordinates:{
                    lat: 321312.31231,
                    lng: 321312.31231
                },
                country: 's',
                city_name: "body.city_name",
            },
            user_name: 'body.user_name',
            favorite_count: 0,
            message: body.message,
            created_date: Date.now,
        })
        
        regEvent.save((err) => {
            if (err){
                console.error(err);
            }
            console.log('Write');
        }) 
    },

    // Get users event collection
    async getCollection () {
       let result ;
       await post.find({}).select('-_id -place -__v').exec((err, post) =>{
           if(err){
               console.log(err)
           }
           else{
               console.log(post);
               result = post;
           }
       })
       return result;
        
    },
    // Registration new user in database system
    async userRegistration (body){ 
        let c = await query.checkRegisteredUser(body)
        if(!c){
        const reqUser = new users({
            user: {
                name: body.name,
                surname: body.surname,
            },
            birthday: body.birthday,
            login: {
                username: body.username,
                password: body.password,
            }
        });

        reqUser.save((err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log("User save")
            }
        })
       }



    },
    // Here carried out check existing username in database 
    async checkRegisteredUser(body, reqist = false) {
        let existUser;
        await users.findOne({
            'login.username': body.username
           },(err, user) => {
               if(err) console.log(err);
               else{
                if(user === null){
                    return existUser = false;
                }
                if(reqist){
                    existUser = user.login.username === body.username ;
                 }
                 else{
                  existUser = user.login.username === body.username || !null;
                 }
               }
           });
        
    return existUser;
    }

}


module.exports = query