var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  database: "task",
});
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected successfully");
  connection.release();
});
module.exports = pool;
