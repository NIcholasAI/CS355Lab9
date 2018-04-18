var express = require('express');
var router = express.Router();
var student_dal = require('../dal/student_dal');

/* GET users listing. */
router.get('/all', function(req,res,next) {
    student_dal.getAll(function (err,result) {
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('student/student_view_all',{students: result[0]});
        }
    })
});

router.get('/add',function(req, res){
    res.render('student/student_add');
});

router.get('/insert',function(req,res){
    student_dal.insert(req.query,function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302,'/student/all');
        }
    });
});

router.get('/edit', function(req,res){
    student_dal.getinfo(req.query.student_id, function(err,result){
        if(err){res.send(err);}
        else {
            res.render('student/studentUpdate',{students: result[0][0]});
        }
    });
});

router.get('/update',function (req,res) {
    student_dal.update(req.query,function (err,result) {
        if (err){
            res.send(err);
        } else {
            res.redirect(302, '/student/all');
        }
    });
});

module.exports = router;