import { Request, Response } from "express";


export const RegisterUser = (request: Request, response: Response) => {
    response.send({
        message: "Hello register!"
    })
}

export const LoginUser = (request: Request, response: Response) => {
    response.send({
        message: "Hello login!"
    })
}