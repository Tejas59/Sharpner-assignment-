const Sequelize = require('sequelize');

const Sequelize = new Sequelize('node','root','Tejas@555',{dialect: 'mysql',host:'localhost'});

module.exports = Sequelize;