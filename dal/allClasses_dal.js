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
    var query = 'INSERT INTO allClasses (className, grade) VALUES (?,?)';

    var queryData = [params.className,params.grade];

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
exports.delete = function(class_id, callback){
    var query = 'DELETE FROM allClasses WHERE class_id = ?';
    var queryData = [class_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,class_id);

    });
};
// Showing full list of open classes for the spring 2020 semester using Joins, Having, and group by
exports.classes_offered = function (callback) {
    var query = 'SELECT department_name, course_name, section_number FROM department d\n' +
        '  LEFT JOIN course c ON d.department_id = c.department_id\n' +
        '  LEFT JOIN section s ON c.course_id = s.course_id GROUP BY c.course_name HAVING section_number >=1';

    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
// Using NOT IT to find all classes that do not have the words "Computer Science" in the title
exports.not_cs_classes = function (callback) {
    var query = 'SELECT className FROM allClasses WHERE className NOT IN ("Computer Science")';

    connection.query(query, function (err, result) {
        callback(err, result);

    });
};