var mysql = require('mysql');
var db = require('./db_connection');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    // Stored procedure to call
    var query = 'CALL student_getall();';

    // Call the stored procedure
    connection.query(query, function (err, result){
        callback(err, result);
    });
};


// insert
exports.insert = function (params,callback){
    // First insert the company...
    var query = 'INSERT INTO student (student_number, first_name, last_name) VALUES (?)';

    var queryData = [params.student_number];

    connection.query(query,queryData, function(err, result){
        if(err || params.student_id === undefined){
            console.log(err);
            callback(err,result);
        } else {
            var student_id = result.insertId;
            var query = 'INSERT INTO student (student_id) VALUES ?';
            var StudentData =[];
            if (params.student_id.constructor === Array){
                for(var i=0; i< params.student_id.length; i++){
                    StudentData.push([student_id,params.student_id[i]]);
                }
            } else {
                StudentData.push([student_id,params.student_id]);
            }
            connection.query(query,[StudentData],function (err,result){ callback(err,result);
            });
        }
    });
};

// getinfo
exports.getinfo = function(student_id, callback){
    var query = 'CALL student_getinfo(?)';
    var queryData = [student_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,result);

    });
};
//update
exports.update = function (params, callback) {
    var query = 'UPDATE student SET student_number = ?, first_name = ?, last_name = ? WHERE student_id = ? ';

    var queryData = [params.student_number,params.first_name, params.last_name, params.student_id];
    connection.query(query,queryData, function (err, result) {
        callback (err, result);
    });
};

// insert new
var NewStudentInsert = function (student_id, studentIdArray,callback){
    var query = 'INSERT INTO student (student_id) VALUES = ?';
    var NewStudentData = [];
    if (studentIdArray.constructor === Array){
        for (var i=0; i < studentIdArray.length; i++){
            NewStudentData.push([student_id, studentIdArray[i]]);
        }
    }else{
        NewStudentData.push([student_id,studentIdArray]);
    }
    connection.query(query,[NewStudentData],function (err,result) {
        callback(err,result);
    });
};