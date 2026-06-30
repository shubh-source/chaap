const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function revert() {
    try {
        await pool.query(`DROP TABLE IF EXISTS restaurants`);
        await pool.query(`ALTER TABLE orders DROP COLUMN IF EXISTS restaurant_id`);
        await pool.query(`ALTER TABLE tables_status DROP COLUMN IF EXISTS restaurant_id`);
        // Drop constraint and add back original
        await pool.query(`ALTER TABLE tables_status DROP CONSTRAINT IF EXISTS tables_status_restaurant_id_table_no_key`);
        await pool.query(`ALTER TABLE tables_status DROP CONSTRAINT IF EXISTS tables_status_table_no_key`).catch(()=>console.log('no key'));
        await pool.query(`ALTER TABLE tables_status ADD CONSTRAINT tables_status_table_no_key UNIQUE (table_no)`);
        console.log("Reverted DB schema.");
    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}
revert();
