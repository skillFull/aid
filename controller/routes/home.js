const express = require('express');
const query = require('../../model/Data');
const router = express.Router();

// Get home page
router.get('/', async function(req, res, next) {
    res.render('index', {
        title : "home", 
        contents: await query.getCollection()
    });
});

module.exports = router;