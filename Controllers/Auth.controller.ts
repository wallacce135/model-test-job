import { Router } from "express";
import { LoginUser, RegisterUser } from '../Services/Auth.service';



class AuthController {
    public path: string = '/auth';
    public router: Router = Router();

    constructor() {
        this.initializeRoutes();
    }


    public initializeRoutes(): void {
        this.router.post(`${this.path}/login`, LoginUser);
        this.router.post(`${this.path}/register`, RegisterUser);
    }
}

export default AuthController;