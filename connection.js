const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'library',
  password: '1234',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = {
    connection
}