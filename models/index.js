const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

module.exports = db = {};
initialize();

async function initialize() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  });

  connection.connect();
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`
  );
  const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      dialect: "mysql",
    }
  );
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.users = require("./user.js")(sequelize, Sequelize);
  

  await sequelize.sync();
}
