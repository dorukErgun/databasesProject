import express from "express";
import mysqlConnection from "../connection.js"
import controller from "../controllers/api.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
    mysqlConnection.query("SELECT * FROM `testtable`", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }

        console.log(rows);
        res.send(rows);
    })
});

Router.get("/programs", controller.getPeople);

Router.get("/x", controller.getPeople);

Router.get("/y", controller.getPeople);

Router.get("/hey", controller.getPeople);

export default Router;