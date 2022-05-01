// connect postgres to server

const { Pool } = require('pg');
const { rows } = require('pg/lib/defaults');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Bilmage",
    database: "todo_database"
});

module.exports = pool