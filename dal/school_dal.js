var mysql = require('mysql');
var db = require('./db_connection');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'SELECT * FROM school;';

    connection.query(query, function (err, result){
        callback(err, result);
    });
};

exports.insert = function (params,callback){
    var query = 'INSERT INTO school (school_name,address_id) VALUES (?,?)';

    var queryData = [params.school_name,params.address_id];

    connection.query(query,queryData, function(err, result)
    { callback(err,result);
            });
};
exports.getinfo = function(school_id, callback){
    var query = 'CALL school_getinfo(?)';
    var queryData = [school_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,result);

    });
};
//update
exports.update = function (params, callback) {
    var query = 'UPDATE school SET school_name = ?, address_id = ? WHERE school_id = ? ';

    var queryData = [params.school_name,params.address_id, params.school_id];
    connection.query(query,queryData, function (err, result) {
        callback (err, result);
    });
};

// insert new
var NewSchoolInsert = function (school_id, schoolIdArray,callback){
    var query = 'INSERT INTO school (school_name,address_id) VALUES (?,?)';
    var NewSchoolData = [];
    if (schoolIdArray.constructor === Array){
        for (var i=0; i < schoolIdArray.length; i++){
            NewSchoolData.push([school_id, schoolIdArray[i]]);
        }
    }else{
        NewSchoolData.push([school_id,schoolIdArray]);
    }
    connection.query(query,[NewSchoolData],function (err,result) {
        callback(err,result);
    });
};

exports.delete = function(school_id, callback){
    var query = 'DELETE FROM school WHERE school_id = ?';
    var queryData = [school_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,school_id);

    });
};
// Listing schools in alphabetical order using Exist, group by , and order by
exports.alphaList = function (callback) {
    var query = 'SELECT school_name FROM school WHERE EXISTS(SELECT * From school) GROUP BY school_name ORDER BY school.school_name';

    connection.query(query, function (err, result) {
        callback(err, result);

    });
};