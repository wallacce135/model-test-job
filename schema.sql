-- SELECT 'CREATE DATABASE db-model-test-job'
-- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db-model-test-job')\gexec

CREATE TABLE IF NOT EXISTS model (
    Id VARCHAR(128) PRIMARY KEY NOT NULL,
    Name VARCHAR(128) NOT NULL,
    Description TEXT NOT NULL,
    Context_length INTEGER,
    Tokenizer VARCHAR(64)
);


