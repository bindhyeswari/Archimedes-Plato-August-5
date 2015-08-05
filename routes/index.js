var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res) {
    console.log('GET request ... ');
    console.warn(req.query); // localhost:3000/test?name=charles --> { name: 'Charles' }
    // console.warn(req.params); // /test/:name --> localhost:3000/test/Charles --> { name: 'Charles' }
    res.status(200).json({ message: 'IMPL_101' });
});

router.post('/test', function (req, res) {
    console.log('POST request ... ');
    console.log(req.body);
    res.status(200).json({ message: 'IMPL_101' });
});

router.get('/upload', function (req, res) {
    // check what is the content type and respond accordingly
    res.render('upload');
});

router.post('/files/upload', function (req, res) {
    res.status(200).json({ message: 'IMPL_101' });
});

module.exports = router;
