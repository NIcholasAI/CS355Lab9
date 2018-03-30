var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CS355', subtitle: ' Lab 9' });
});
router.get('/template_example',function(req,res,next){
  res.render('template_example',{first_name:req.query.first_name,last_name:req.query.last_name})
});
router.get('/resume',function(req,res,next){
  res.render('resume',{first_name:req.query.first_name,last_name:req.query.last_name,major:req.query.major})
});
module.exports = router;
