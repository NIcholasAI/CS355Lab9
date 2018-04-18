var express = require('express');
var router = express.Router();
var classes_dal = require('../dal/allClasses_dal');

/* GET users listing. */
router.get('/all', function(req,res,next) {
    classes_dal.getAll(function (err,result) {
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('classes/allClasses_view_all',{classes: result[0]});
        }
    })
});

router.get('/add',function(req, res){
    res.render('classes/allClasses_add');
});

router.get('/insert',function(req,res){
    classes_dal.insert(req.query,function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302,'/allClasses/all');
        }
    });
});

router.get('/edit', function(req,res){
    classes_dal.getinfo(req.query.class_id, function(err,result){
        if(err){res.send(err);}
        else {
            res.render('classes/allClassesUpdate',{classes: result[0][0]});
        }
    });
});

router.get('/update',function (req,res) {
    classes_dal.update(req.query,function (err,result) {
        if (err){
            res.send(err);
        } else {
            res.redirect(302, '/allClasses/all');
        }
    });
});

module.exports = router;