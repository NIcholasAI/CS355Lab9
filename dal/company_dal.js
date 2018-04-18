var mysql = require('mysql');
var db = require('./db_connection');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'SELECT * FROM company;';

    connection.query(query, function (err, result){
        callback(err, result);
    });
};

exports.insert = function (params,callback){
    // First insert the company...
    var query = 'INSERT INTO company (company_name) VALUES (?)';

    var queryData = [params.company_name];

    connection.query(query,queryData, function(err, result){
        if(err || params.address_id === undefined){
            console.log(err);
            callback(err,result);
        } else {
            var company_id = result.insertId;
            var query = 'INSERT INTO company_address (company_id, address_id) VALUES ?';
            // companyAddressData is a multidimensional array of values.
            var companyAddressData =[];
            if (params.address_id.constructor === Array){
                for(var i=0; i< params.address_id.length; i++){
                    companyAddressData.push([company_id,params.address_id[i]]);
                }
            } else {
                companyAddressData.push([company_id,params.address_id]);
            }
            connection.query(query,[companyAddressData],function (err,result){ callback(err,result);
            });
        }
    });
};
exports.getinfo = function(company_id, callback){
    var query = 'CALL company_getinfo(?)';
    var queryData = [company_id];

    connection.query(query,queryData,function (err, result) {
        callback(err,result);

    });
};
// Takes in company_id and array of addresses to insert into company_address table

    var companyAddressInsert = function (company_id, addressIdArray,callback){
        var query = 'INSERT INTO company_address (company_id, address_id) VALUES ?';
        var companyAddressData = [];
        if (addressIdArray.constructor === Array){
            for (var i=0; i < addressIdArray.length; i++){
                companyAddressData.push([company_id, addressIdArray[i]]);
            }
        }else{
            companyAddressData.push([company_id,addressIdArray]);
        }
        connection.query(query,[companyAddressData],function (err,result) {
            callback(err,result);
        });
    };

    // Takes in company_id and array of address_ids calls delete procedure

    var companyAddressUpdate = function (company_id, addressIdArray, callback) {
        var query = 'CALL company_address_delete(?)';

        connection.query(query, company_id, function (err,result) {
            if (err || addressIdArray === undefined){
                callback(err,result);
            } else {
                companyAddressInsert(company_id,addressIdArray,callback);
            }
        });
    };

    // Takes in a param json object to include company_id, company_name, and array of address the user selected

    exports.update = function (params, callback) {
        var query = 'UPDATE company SET company_name = ? WHERE company_id = ? ';

        var queryData = [params.company_name, params.company_id];
        connection.query(query,queryData, function (err, result) {
            companyAddressUpdate(params.company_id, params.address_id, function (err, result) {
                callback (err, result);
            });
        });
    };