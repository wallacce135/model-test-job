import App from "./App";
import ModelsContoller from "./Controllers/Models.controller";
const dotenv = require("dotenv");
dotenv.config();

const app = new App(
    [
        new ModelsContoller(),
    ],
    process.env.NODE_LOCAL_PORT || 3000
)

app.listen()

