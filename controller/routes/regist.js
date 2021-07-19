const express = require('express');
const { validationResult } = require('express-validator');
const { MemoryStore } = require('express-session');

const router = express.Router();
const MStore = new MemoryStore();
 
const checkUser = require('../../utils/checkUser');
const query = require('../../model/Data');




router.get('/', (req, res) => {
    res.render('login');
});


router.post('/', checkUser, (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(400).json({errors: errors.array()});
        }

        query.userRegistration(req.body);
        req.session.auth = 1;
        MStore.set(req.sessionID, req.session.auth, (err) => {
            if(err) console.log(err);
            res.redirect('/');
            console.log('Session save');
        })


    } catch (error) {
        res.status(500).send("Error")
        console.log(error);

    }
});

module.exports = router;