const express = require('express');
const router = express.Router();
const query = require('../../model/Data');


router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    console.log(req.body);
    query.userRegistration(req.body);
    let result = query.getCollection()
    res.render('index', {title : "home", contents: result});
})

module.exports = router;