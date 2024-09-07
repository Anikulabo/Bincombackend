const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('inec_project', "root" ,"", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    logging: console.log, 
  });

const db = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file.indexOf(".js") !== -1 && file !== "index.js") {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
