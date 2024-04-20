import bodyParser from "body-parser";
import express from "express";
import { errorHandler } from "./Middleware/error.middleware";



class App {

    public application: express.Application;
    public PORT: number | string;

    constructor(controllers: any[], PORT: number | string) {
        this.application = express();
        this.PORT = PORT;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);

    }

    private initializeMiddlewares(): void {
        this.application.use(bodyParser.json());
        this.application.use(errorHandler);
    }

    private initializeControllers(controllers: any): void {
        controllers.forEach((controller: any) => {
            this.application.use('/api', controller.router);
        });
    }

    public listen(): void {
        this.application.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        });
    }
}

export default App;