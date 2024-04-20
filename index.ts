import App from "./App";
import AuthController from "./Controllers/Auth.controller";
import ModelsContoller from "./Controllers/Models.controller";
const dotenv = require("dotenv");
dotenv.config();

const app = new App(
    [
        new ModelsContoller(),
        new AuthController()
    ],
    process.env.PORT || 3000
)

app.listen()

