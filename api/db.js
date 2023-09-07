const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'where-should-this-screw-go'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};