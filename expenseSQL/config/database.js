const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',          
  username: 'root',           
  password: 'Tejas@555',      
  database: 'node'            
});

module.exports = sequelize;
