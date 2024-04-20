import { Router } from 'express';
import {
    getAllModels,
    getOneModel,
    createModel,
    updateModel,
    deleteModel,
    getModelsOnceInDay
} from '../Services/Model.service';

class ModelsController {

    public path: string = '/models';
    public router: Router = Router();

    constructor() {
        this.initializeRoutes();
        this.initializeRoutelessServices();
    }
    
    
    public initializeRoutes(): void {
        this.router.get(this.path, getAllModels);
        this.router.get(`${this.path}/:id`, getOneModel);
        this.router.post(this.path, createModel);
        this.router.put(`${this.path}/:id`, updateModel);
        this.router.get(`${this.path}/:id`, deleteModel);
    }

    public initializeRoutelessServices(): void {
        getModelsOnceInDay();
    }
    
    
}


export default ModelsController;