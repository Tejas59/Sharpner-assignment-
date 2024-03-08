const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user: 'root',
    database: 'practice',
    password: 'Tejas@555'

});

module.exports = pool.promise();