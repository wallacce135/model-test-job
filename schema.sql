DO
$do$
BEGIN
   IF EXISTS (SELECT FROM pg_database WHERE datname = 'db-model-test-job') THEN
      RAISE NOTICE 'Database already exists';
   ELSE
      PERFORM dblink_exec('dbname=' || current_database(), 'CREATE DATABASE mydb');
   END IF;
END
$do$;

CREATE TABLE IF NOT EXISTS model (
    Id VARCHAR(128) PRIMARY KEY NOT NULL,
    Name VARCHAR(128) NOT NULL,
    Description TEXT NOT NULL,
    Context_length INTEGER,
    Tokenizer VARCHAR(64)
);


