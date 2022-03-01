import express from "express";
import bodyParser from "body-parser";
import mysqlConnection from "./connection.js"

import PeopleRoutes from "./routes/people.js"

var app = express();
app.use(bodyParser.json());

app.use("/people", PeopleRoutes);


app.listen(3000);