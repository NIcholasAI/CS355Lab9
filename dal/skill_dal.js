var mysql = require('mysql');
var db = require('./db_connection');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    // Stored procedure to call
    var query = 'CALL skill_getall();';

    // Call the stored procedure
    connection.query(query, function (err, result){
        callback(err, result);
    });
};


// insert
exports.insert = function (params,callback){
    // First insert the company...
    var query = 'INSERT INTO skill (skill_name) VALUES (?)';

    var queryData = [params.skill_name];

    connection.query(query,queryData, function(err, result){
        if(err || params.skill_id === undefined){
            console.log(err);
            callback(err,result);
        } else {
            var skill_id = result.insertId;
            var query = 'INSERT INTO skill (skill_id) VALUES ?';
            // SkillData is a multidimensional array of values.
            var SkillData =[];
            if (params.skill_id.constructor === Array){
                for(var i=0; i< params.skill_id.length; i++){
                    SkillData.push([skill_id,params.skill_id[i]]);
                }
            } else {
                SkillData.push([skill_id,params.skill_id]);
            }
            connection.query(query,[SkillData],function (err,result){ callback(err,result);
            });
        }
    });
};

// getinfo
exports.getinfo = function(skill_id, callback){
    var query = 'CALL skill_getinfo(?)';
    var queryData = [skill_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,result);

    });
};
//update
exports.update = function (params, callback) {
    var query = 'UPDATE skill SET skill_name = ?, description = ? WHERE skill_id = ? ';

    var queryData = [params.skill_name,params.description, params.skill_id];
    connection.query(query,queryData, function (err, result) {
        callback (err, result);
    });
};

// insert new
var NewSkillInsert = function (skill_id, skillIdArray,callback){
    var query = 'INSERT INTO skill (skill_id) VALUES = ?';
    var NewSkillData = [];
    if (skillIdArray.constructor === Array){
        for (var i=0; i < skillIdArray.length; i++){
            NewSkillData.push([skill_id, skillIdArray[i]]);
        }
    }else{
        NewSkillData.push([skill_id,skillIdArray]);
    }
    connection.query(query,[NewSkillData],function (err,result) {
        callback(err,result);
    });
};

exports.delete = function(skill_id, callback){
    var query = 'DELETE FROM skill WHERE skill_id = ?';
    var queryData = [skill_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,skill_id);

    });
};