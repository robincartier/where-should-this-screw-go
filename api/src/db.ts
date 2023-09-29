import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432, // default Postgres port
    database: "where-should-this-screw-go"
});

export default {
    query: (text, params) => pool.query(text, params)
};