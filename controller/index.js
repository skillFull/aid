const { Router } = require("express");
const Session = require('express-session');

const MemoryStore = Session.MemoryStore;
const router = Router();
const MStore = new MemoryStore();

const events = require('./routes/events');
const home = require('./routes/home');
const regist = require('./routes/regist');
const message = require('./routes/message');


router.use(Session({
    secret: 'key',
    // genid: function (req) {
    //   return genuuid ()
    // },
    store: MStore,
    cookie: {
        maxAge: 86400000
    }
}));


router.get('/', (req, res, next) => {
    try {

        MStore.get(req.sessionID, (err, sess) => {
            if (err) console.log(err);
    
            if (sess) {
                if (req.path.toString() === '/') res.redirect('/home');
                router.use('/home', home);
                router.use('/events', events);
                router.use('/messages', message);
           }
           else{

            res.redirect('/regist');
            console.log(`${req.path} sssssssssssss`);

           }
         

        } );
    
    
           
        
    } catch (error) {
        console.log(`${error} router / `)
    }
   
    
} )

router.use('/regist', regist);

module.exports = router;