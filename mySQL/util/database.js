const mysql = require('mysql');

const pool = mysql.createPool({
    host : 'localhost',
    user: 'root',
    database: 'node',
    password: 'Tejas@555'

});

module.exports = pool.promise();