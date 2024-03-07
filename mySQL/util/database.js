const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user: 'root',
    database: 'node-try',
    password: 'Tejas@555'

});

module.exports = pool.promise();