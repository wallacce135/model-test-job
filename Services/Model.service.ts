import { NextFunction, Request, Response } from 'express';
import { schedule } from 'node-cron';
import { pool } from '../database';
import { IModel } from '../Dto/Model.dto';
import { CREATE_MODEL_QUERY, DELETE_MODEL_QUERY, GET_MODEL_BY_ID, UPDATE_MODEL_QUERY } from '../Queries/Model.queries';
import { error } from 'console';
import { HttpError } from '../Classes/HttpError';

export const getAllModels = async (request: Request, response: Response, next: NextFunction) => {
    // todo pagination
    return pool.query(`SELECT * FROM models`)
    .then(data => response.send(data.rows as IModel[]))
    .catch(error => next(error))
}

export const createModel = async (request: Request, response: Response, next: NextFunction) => {
    // todo: check response.headers.authorization
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
    // todo: check response.headers.authorization
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
    // todo: check response.headers.authorization
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

    // schedule('* * * * * *', () => {
    //     console.log('Hello world!');
    // })

};

// additional helpers

function getValuesOfModel(model: IModel) {
    return [
        model.Id,
        model.Name,
        model.Description,
        model.Context_length,
        model.Tokenizer
    ]
}