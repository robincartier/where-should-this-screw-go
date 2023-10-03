import { ClientBase, Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432, // default Postgres port
    database: "where-should-this-screw-go"
});

const query = (text: string, params: (string | number | boolean)[]) => {
    try {
        return pool.query(text, params);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const transaction = async (queries: (query: ClientBase) => Promise<unknown>) => {
    
    let client;
    let dbo: unknown;

    try {
        client = await pool.connect();

        await client.query("BEGIN");

        dbo = await queries(client);
        // console.log(queries);

        // const queryText = "INSERT INTO users(name) VALUES($1) RETURNING id";
        // const res = await client.query(queryText, ["brianc"]);
     
        // const insertPhotoText = "INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)";
        // const insertPhotoValues = [res.rows[0].id, "s3.bucket.foo"];
        // await client.query(insertPhotoText, insertPhotoValues);
        await client.query("COMMIT");
    } catch (e) {
        if (client) await client.query("ROLLBACK");
        throw e;
    } finally {
        if (client) client.release();
    }

    return dbo;
};

export { query, transaction };

export type queryType = typeof query;
export type transactionType = typeof transaction;



// const client = await pool.connect();
 
// try {
//     await client.query("BEGIN");
//     const queryText = "INSERT INTO users(name) VALUES($1) RETURNING id";
//     const res = await client.query(queryText, ["brianc"]);
 
//     const insertPhotoText = "INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)";
//     const insertPhotoValues = [res.rows[0].id, "s3.bucket.foo"];
//     await client.query(insertPhotoText, insertPhotoValues);
//     await client.query("COMMIT");
// } catch (e) {
//     await client.query("ROLLBACK");
//     throw e;
// } finally {
//     client.release();
// }