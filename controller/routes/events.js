const express = require('express');
const router = express.Router();
const query = require('../../model/Data');
const multer = require('multer');
const unload = multer();



router.get('/', function(req, res, next) {
  res.render('index', {title: 'events'});
});


router.post('/', unload.none() ,(req, res) => {
  query.writeEvent(req.body);
  res.send('Save')
})


module.exports = router;
