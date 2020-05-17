require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  connectionTimeout: 1500000,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

console.log(config);

(async function () {
  try {
    let pool = await sql.connect(config);
    let result1 = await pool.request().query("SELECT username FROM dbo.users");

    console.log(result1);
  } catch (err) {
    console.log(err.message);
  }
})();
