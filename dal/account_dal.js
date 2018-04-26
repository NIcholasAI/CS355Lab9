var mysql = require('mysql');
var db = require('./db_connection');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    // Stored procedure to call
    var query = 'CALL account_getall();';

    // Call the stored procedure
    connection.query(query, function (err, result){
        callback(err, result);
    });
};


// insert
exports.insert = function (params,callback){
    // First insert the company...
    var query = 'INSERT INTO account (email) VALUES (?)';

    var queryData = [params.email];

    connection.query(query,queryData, function(err, result){
        if(err || params.account_id === undefined){
            console.log(err);
            callback(err,result);
        } else {
            var account_id = result.insertId;
            var query = 'INSERT INTO account (account_id) VALUES ?';
            // AccountData is a multidimensional array of values.
            var AccountData =[];
            if (params.account_id.constructor === Array){
                for(var i=0; i< params.account_id.length; i++){
                    AccountData.push([account_id,params.account_id[i]]);
                }
            } else {
                AccountData.push([account_id,params.account_id]);
            }
            connection.query(query,[AccountData],function (err,result){ callback(err,result);
            });
        }
    });
};

// getinfo
exports.getinfo = function(account_id, callback){
    var query = 'CALL account_getinfo(?)';
    var queryData = [account_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,result);

    });
};
//update
exports.update = function (params, callback) {
    var query = 'UPDATE account SET email = ?, first_name = ?, last_name = ? WHERE account_id = ? ';

    var queryData = [params.email,params.first_name, params.last_name, params.account_id];
    connection.query(query,queryData, function (err, result) {
        callback (err, result);
    });
};

// insert new
var NewAccountInsert = function (account_id, accountIdArray,callback){
    var query = 'INSERT INTO account (account_id) VALUES = ?';
    var NewAccountData = [];
    if (accountIdArray.constructor === Array){
        for (var i=0; i < accountIdArray.length; i++){
            NewAccountData.push([account_id, accountIdArray[i]]);
        }
    }else{
        NewAccountData.push([account_id,accountIdArray]);
    }
    connection.query(query,[NewAccountData],function (err,result) {
        callback(err,result);
    });
};