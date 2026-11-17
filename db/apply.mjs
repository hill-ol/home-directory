/*
 * Applies db/schema.sql to the branch in .env.local.
 *
 *   node --env-file=.env.local db/apply.mjs
 *
 * Uses DATABASE_URL_UNPOOLED, the direct connection. Schema changes must not
 * go through PgBouncer: pooled connections run in transaction mode and drop
 * session state, which breaks DDL in ways that never name pooling as the
 * cause.
 *
 * This is deliberately small. If the schema grows past a couple of tables,
 * replace it with a real migration tool rather than extending this.
 */
import { readFile } from "node:fs/promises";
import { Pool } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED;

if (!url) {
    console.error(
        "DATABASE_URL_UNPOOLED is not set. Run `neon deploy` to pull the " +
        "branch's env vars into .env.local first.",
    );
    process.exit(1);
}

const schema = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
const pool = new Pool({ connectionString: url });

try {
    await pool.query(schema);
    console.log("Applied db/schema.sql");

    const { rows } = await pool.query(
        `select column_name, data_type
           from information_schema.columns
          where table_name = 'content'
       order by ordinal_position`,
    );

    console.table(rows);
} finally {
    await pool.end();
}
