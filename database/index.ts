import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    host: process.env.POSTGRESDB_HOST || "localhost",
    port: Number(process.env.POSTGRESDB_DOCKER_PORT) || 5432,
    user: process.env.POSTGRESDB_USER || "postgres",
    password: process.env.POSTGRESDB_ROOT_PASSWORD || "root",
    max: 5,
    idleTimeoutMillis: Number(process.env.POSTGRESDB_IDLE_TIMEOUT) || 30000,
    connectionTimeoutMillis: Number(process.env.POSTGRESDB_CONNECT_TIMEOUT) || 2000,
});


export { pool };