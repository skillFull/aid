const express = require('express');
const query = require('../../model/data_base/Data');
const router = express.Router();

// Get home page
router.get('/', async function(req, res, next) {
  let result ;
  result = await query.getCollection();
  res.render('index', {title : "home", contents: result});
});

module.exports = router;
