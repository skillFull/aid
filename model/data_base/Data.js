'use strict'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aid', {useNewUrlParser: true, useUnifiedTopology: true});

const eventUser = mongoose.Schema({
    event: String,
    descriptionEvent: String,
    positionEvent: {
        latitude: Number,
        longitude: Number,
    },
    Date: Number,
});

const events = mongoose.model('events', eventUser);

const user = mongoose.Schema({
    user : {
        name: String,
        surname: String,
    },

    birthday: Number,
    location: String,
    frends: Array,
    login : {
        username: String,
        password: String,
    },
    email: String,

})

const users = mongoose.model('users', user)

const query = {
    // Write users new event collection 
    writeEvent (body) {

        const regEvent = new events({
            event: body.onEvent,
            descriptionEvent: body.descriptionEvent,
            positionEvent: {
                latitude: body.latitude,
                longitude: body.longitude,
            },
            Date: body.Date,
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
       let result;
       await events.find({}, (err, event) => {
           if( err){ 
               console.log(err)
           }
           else{
               result = event;
           }
       });
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