var express = require('express');
var router = express.Router();
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

/* GET home page. */

router.get('/', (req, res, next) => {

  readFileAsync('public/data/shoes.json')
    .then((data) => {
      let item = JSON.parse(data);
      res.render('home', {
        data: item
      });
    })
    .catch((err) => {
      console.error('Đã xảy ra lỗi:', err);
      next()
    });

});

module.exports = router;
