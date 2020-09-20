const dbConfig = require("../db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true
    },
    timezone: '+01:00' //for writing to database
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todos = require("./todo.models.js")(sequelize, Sequelize);

module.exports = db;