require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import { PORT } from "./constants";
import router from "./routes/index.routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
