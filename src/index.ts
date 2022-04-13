require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import { PORT } from "./constants";
import router from "./routes/index.routes";
import cluster from "cluster";
import e from "express";

const app = express();
const cpu_length = require("os").cpus().length;
const env = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

if (env === "production") {
    if (cluster.isMaster) {
        for (let i = 0; i < cpu_length; i++) {
            cluster.fork();
        }
    } else {
        app.listen(PORT, () =>
            console.log(`Server is running on PORT: ${PORT}`)
        );
    }
} else {
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}
