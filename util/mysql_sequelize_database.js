const Sequelize = require('sequelize');

const dbconnect = new Sequelize('test', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3632
});

module.exports = dbconnect;
