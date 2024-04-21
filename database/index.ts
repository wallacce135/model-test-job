import { Pool } from 'pg';


const pool = new Pool({
    host: 'localhost',
    connectionString: `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@db:5432/${process.env.POSTGRESDB_DATABASE}`,
    max: 5,
    idleTimeoutMillis: Number(process.env.POSTGRESDB_IDLE_TIMEOUT) || 30000,
    connectionTimeoutMillis: Number(process.env.POSTGRESDB_CONNECT_TIMEOUT) || 2000,
});


export { pool };