const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodedb', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;