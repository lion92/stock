var mysql = require('mysql');

function Connection() {

  this.pool = mysql.createPool({

    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    connectionLimit:100,
    multipleStatements:true,
    database:"stock"
     //mysql connection pool length
  //  database: "todo"

});

  this.init = function() {
    this.pool = mysql.createPool({

        host:"localhost",
        port:"3306",
        user:"root",
        password:"",
        connectionLimit:100,
        multipleStatements:true,
        database:"stock"
         //mysql connection pool length
      //  database: "todo"

    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      console.log(err);
      callback(err, connection);

    });
  };
}
/*
var mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function() {
        this.pool = mysql.createPool({

            host:process.env.host,
            port:process.env.port,
            user:process.env.user,
            password:process.env.password,
            connectionLimit:process.env.connectionLimit,
            multipleStatements:process.env.multipleStatements,
            database:process.env.database
            //mysql connection pool length
            //  database: "todo"

        });
    };

    this.acquire = function(callback) {
        this.pool.getConnection(function(err, connection) {
            console.log(err);
            callback(err, connection);

        });
    };
}

*/

module.exports = new Connection();
