const { Pool } = require("pg");

// conecting object

const config = {
  user: "postgres",
  host: "localhost",
  database: "cursos",
  password: "Megustaelagua1*",
  port: 5432,
};

// conecting to database
const pool = new Pool(config);

module.exports = { pool };
