export const GET_MODEL_BY_ID: string = `
    SELECT * FROM model WHERE Id = $1;
`;

export const GET_MODELS: string = `
    SELECT * FROM model;
`;

export const CREATE_MODEL_QUERY: string = `
    INSERT INTO model (Id, Name, Description, Context_length, Tokenizer) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
`;

export const UPDATE_MODEL_QUERY: string = `
    UPDATE model 
    SET Name = $2, 
    Description = $3, 
    Context_length = $4, 
    Tokenizer = $5 
    WHERE Id = $1 
    RETURNING *;
`;

export const DELETE_MODEL_QUERY: string = `
    DELETE FROM model
    WHERE Id = $1
    RETURNING *;
`;