import { Pool, QueryResult } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432, // default Postgres port
    database: "where-should-this-screw-go"
});

export default {
    query: (text: string, params: (string | number | boolean)[]) => pool.query(text, params)
};

export type dbType = {
    query: (text: string, params: (string | number | boolean)[]) => Promise<QueryResult>
};