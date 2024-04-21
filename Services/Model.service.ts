import { Request, Response } from 'express';
import { schedule } from 'node-cron';
import { pool } from '../database';
import { IModel } from '../Interfaces/Model.interface';
import { CREATE_MODEL_QUERY, DELETE_MODEL_QUERY, GET_MODEL_BY_ID, UPDATE_MODEL_QUERY } from '../Queries/Model.queries';
import axios from 'axios';

export const getAllModels = async (request: Request, response: Response) => {
    const models: IModel[] = (await pool.query(`SELECT * FROM model`)).rows;
    response.send([
        ...models
    ])
}

export const createModel = async (request: Request, response: Response) => {
    // todo: check response.headers.authorization
    try {
        const body: IModel = request.body;
        const values = getValuesOfModel(body);
        const model: IModel = (await pool.query(CREATE_MODEL_QUERY, values)).rows[0];

        return response.send(model);
    }
    catch (error: any) {
        console.error(error.stack);
        return response.send({ message: "Server internal" }) 
    }
}

export const updateModel = async (request: Request, response: Response) => {
    // todo: check response.headers.authorization
    const { id } = request.params;
    const body: IModel = request.body;

    if (id !== body.Id) {
        throw new Error(`id in url and body doesn\`t match: ${id} != ${body.Id}`);
    }

    const values = getValuesOfModel(body)

    const model: IModel = (await pool.query(UPDATE_MODEL_QUERY, values)).rows[0];

    response.send(model)
}

export const deleteModel = async (request: Request, response: Response) => {
    // todo: check response.headers.authorization
    const { id } = request.params;
    const model: IModel = (await pool.query(DELETE_MODEL_QUERY, [ id ])).rows[0];

    response.send(model)
}

export const getOneModel = async (request: Request, response: Response) => {
    const { id } = request.params;
    const model: IModel = (await pool.query(GET_MODEL_BY_ID, [ id ])).rows[0]; 

    response.send(model);
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