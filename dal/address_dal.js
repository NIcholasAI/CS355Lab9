var mysql = require('mysql');
var db = require('./db_connection');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    // Stored procedure to call
    var query = 'CALL address_getall();';

    // Call the stored procedure
    connection.query(query, function (err, result){
        callback(err, result);
    });
};


// insert
exports.insert = function (params,callback){
    // First insert the company...
    var query = 'INSERT INTO address (street) VALUES (?)';

    var queryData = [params.street];

    connection.query(query,queryData, function(err, result){
        if(err || params.address_id === undefined){
            console.log(err);
            callback(err,result);
        } else {
            var address_id = result.insertId;
            var query = 'INSERT INTO address (address_id) VALUES ?';
            // AddressData is a multidimensional array of values.
            var AddressData =[];
            if (params.address_id.constructor === Array){
                for(var i=0; i< params.address_id.length; i++){
                    companyAddressData.push([address_id,params.address_id[i]]);
                }
            } else {
                companyAddressData.push([address_id,params.address_id]);
            }
            connection.query(query,[AddressData],function (err,result){ callback(err,result);
            });
        }
    });
};

// getinfo
exports.getinfo = function(address_id, callback){
    var query = 'CALL address_getinfo(?)';
    var queryData = [address_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,result);

    });
};
//update
exports.update = function (params, callback) {
    var query = 'UPDATE address SET street = ?, zip_code = ? WHERE address_id = ? ';

    var queryData = [params.street,params.zip_code, params.address_id];
    connection.query(query,queryData, function (err, result) {
        callback (err, result);
    });
};

// insert new
var NewAddressInsert = function (address_id, addressIdArray,callback){
    var query = 'INSERT INTO address (address_id) VALUES = ?';
    var NewAddressData = [];
    if (addressIdArray.constructor === Array){
        for (var i=0; i < addressIdArray.length; i++){
            NewAddressData.push([address_id, addressIdArray[i]]);
        }
    }else{
        NewAddressData.push([address_id,addressIdArray]);
    }
    connection.query(query,[NewAddressData],function (err,result) {
        callback(err,result);
    });
};