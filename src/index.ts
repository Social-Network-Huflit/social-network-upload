require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import { PORT } from "./constants";
import router from "./routes/index.routes";
import cluster from "cluster";

const app = express();
const cpu_length = require("os").cpus().length;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

if (cluster.isMaster) {
    for (let i = 0; i < cpu_length; i++) {
        cluster.fork();
    }
} else {
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}
