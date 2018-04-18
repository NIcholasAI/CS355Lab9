var mysql = require('mysql');
var db = require('./db_connection');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    // Stored procedure to call
    var query = 'CALL allClasses_getall();';

    // Call the stored procedure
    connection.query(query, function (err, result){
        callback(err, result);
    });
};


// insert
exports.insert = function (params,callback){
    // First insert
    var query = 'INSERT INTO allClasses (className) VALUES (?)';

    var queryData = [params.className];

    connection.query(query,queryData, function(err, result){
        if(err || params.class_id === undefined){
            console.log(err);
            callback(err,result);
        } else {
            var class_id = result.insertId;
            var query = 'INSERT INTO allClasses (class_id) VALUES ?';
            // SkillData is a multidimensional array of values.
            var classData =[];
            if (params.class_id.constructor === Array){
                for(var i=0; i< params.class_id.length; i++){
                    classData.push([class_id,params.class_id[i]]);
                }
            } else {
                classData.push([class_id,params.class_id]);
            }
            connection.query(query,[classData],function (err,result){ callback(err,result);
            });
        }
    });
};

// getinfo
exports.getinfo = function(class_id, callback){
    var query = 'CALL allClasses_getinfo(?)';
    var queryData = [class_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,result);

    });
};
//update
exports.update = function (params, callback) {
    var query = 'UPDATE allClasses SET className = ?, grade = ?, taken = ?, dateComplete = ? WHERE class_id = ? ';

    var queryData = [params.className, params.grade, params.taken, params.dateComplete, params.class_id];
    connection.query(query,queryData, function (err, result) {
        callback (err, result);
    });
};

// insert new
var NewClassInsert = function (class_id, classIdArray,callback){
    var query = 'INSERT INTO allClasses (class_id) VALUES = ?';
    var NewClassData = [];
    if (classIdArray.constructor === Array){
        for (var i=0; i < classIdArray.length; i++){
            NewClassData.push([class_id, classIdArray[i]]);
        }
    }else{
        NewClassData.push([class_id,classIdArray]);
    }
    connection.query(query,[NewClassData],function (err,result) {
        callback(err,result);
    });
};