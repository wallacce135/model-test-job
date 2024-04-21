import { NextFunction, Request, Response } from 'express';
import { schedule } from 'node-cron';
import { pool } from '../database';
import { HttpError } from '../Classes/HttpError';
import { IModel } from '../Interfaces/Model.interface';
import { CREATE_MODEL_QUERY, DELETE_MODEL_QUERY, GET_MODEL_BY_ID, UPDATE_MODEL_QUERY, GET_MODELS } from '../Queries/Model.queries';
import axios from 'axios';


export const getAllModels = async (request: Request, response: Response, next: NextFunction) => {
    const { skip = 0, limit = 0 } = request.body;

    const query = limit ? `${GET_MODELS} OFFSET $1 LIMIT $2` : `${GET_MODELS} OFFSET $1`
    const values = limit ? [ skip, limit ] : [ skip ];

    return pool.query(query, values)
    .then(data => response.send(data.rows as IModel[]))
    .catch(error => next(error))
}

export const createModel = async (request: Request, response: Response, next: NextFunction) => {
    
    if(checkToken(request.headers.authorization?.split(' ')[1]) === false) throw new HttpError('NOT VALID TOKEN!', 401);

    const body: IModel = request.body;
    const values = getValuesOfModel(body);

    return pool.query(CREATE_MODEL_QUERY, values)
    .then(data => {
        if (!data.rows.length) { 
            throw new HttpError("cannot create model") 
        }; 

        response.send(data.rows[0] as IModel)
    })
    .catch(error => next(error))
}

export const updateModel = async (request: Request, response: Response, next: NextFunction) => {
    
    if(checkToken(request.headers.authorization?.split(' ')[1]) === false) throw new HttpError('NOT VALID TOKEN!', 401);

    const { id } = request.params;
    const body: IModel = request.body;

    if (id !== body.Id) {
        return next(new HttpError(`id in url and body doesn\`t match: ${id} != ${body.Id}`)); 
    }

    const values = getValuesOfModel(body)

    return pool.query(UPDATE_MODEL_QUERY, values).then(data => {
        if (!data.rows.length) { 
            throw new HttpError("cannot update model") 
        }; 

        response.send(data.rows[0] as IModel)
    })
    .catch(error => next(error))
}

export const deleteModel = async (request: Request, response: Response, next: NextFunction) => {
    
    if(checkToken(request.headers.authorization?.split(' ')[1]) === false) throw new HttpError('NOT VALID TOKEN!', 401);

    const { id } = request.params;
    return pool.query(DELETE_MODEL_QUERY, [ id ]).then(data => {
        if (!data.rows.length) { 
            throw new HttpError(`0 models was deleted`)
        }; 

        response.send(data.rows[0] as IModel)
    })
    .catch(error => next(error))
}

export const getOneModel = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;

    return pool.query(GET_MODEL_BY_ID, [ id ]).then(data => {
        if (!data.rows.length) { 
            throw new HttpError(`model not found`, 404) 
        }; 

        response.send(data.rows[0] as IModel)
    })
    .catch(error => next(error))
}

export const getModelsOnceInDay = () => {
    schedule('0 0 * * *', async () => {
        const data = await axios.get<any>("https://openrouter.ai/api/v1/models");
        for (const model of data.data.data) {
            await pool.query(CREATE_MODEL_QUERY, [model.id, model.name, model.description, model.context_length, model.architecture.tokenizer])
        }
        console.log('CRON task saved data!');
    })

};


const checkToken = (authorization: string | undefined): boolean => {
    
    const token = authorization ? authorization.split(' ')[0] : undefined;
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN

    if(token === ACCESS_TOKEN) {
        return true;
    }
    return false;
    

}

function getValuesOfModel(model: IModel) {
    return [
        model.Id,
        model.Name,
        model.Description,
        model.Context_length,
        model.Tokenizer
    ]
}