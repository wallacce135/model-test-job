import { Request, Response } from 'express';
import { schedule } from 'node-cron';

export const getAllModels = (request: Request, response: Response) => {
    response.send({
        message: "Hello world!"
    })
}

export const createModel = (request: Request, response: Response) => {
    response.send({
        message: "Hello world!"
    })
}

export const updateModel = (request: Request, response: Response) => {
    console.log("id -> ", request.params.id);
    response.send({
        message: "Hello world! "
    })
}

export const deleteModel = (request: Request, response: Response) => {
    response.send({
        message: "Hello world!"
    })
}

export const getOneModel = (request: Request, response: Response) => {

}

export const getModelsOnceInDay = () => {

    // schedule('* * * * * *', () => {
    //     console.log('Hello world!');
    // })

};