const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "leedskreyy",
    host: "localhost",
    database: "perntodo",
});

module.exports = pool;
