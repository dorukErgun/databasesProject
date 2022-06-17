import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import routes from "./routes/routes.js"

var app = express();

app.use(cors())
app.use(bodyParser.json());

app.use("/api", routes);


app.listen(3000);