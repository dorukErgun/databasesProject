import express from "express";
import mysqlConnection from "../connection.js"
import controller from "../controllers/api.js";

const Router = express.Router();

Router.get("/programs", async (req, res) => {
    mysqlConnection.query("SELECT * FROM `program`", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }

        console.log(rows);
        res.send(rows);
    })
});

Router.get("/mentors", async (req, res) => {
    mysqlConnection.query("SELECT * FROM `mentor`", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }

        console.log(rows);
        res.send(rows);
    })
});

Router.get("/movementranking", async (req, res) => {
    mysqlConnection.query("SELECT * FROM `movementranking`", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

Router.get("/longestdiscounts", async (req, res) => {
    var triggerTrial = []
    mysqlConnection.query("SELECT * FROM `longestdiscounts`", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
        triggerTrial.push(rows);
        res.send(rows);
    })
});

Router.get("/triggertrial", async (req, res) => {
    mysqlConnection.query("SELECT * FROM `mentornickname`", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

Router.get("/addmentor", async (req, res) => {
    mysqlConnection.query("INSERT INTO `mentor` (`Name`, `Description`, `NumberOfPrograms`) VALUES ('Lastly Added Person', 'Bık bık bık', 0)", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
    })
});

Router.get("/deleteprogram/:Id", async (req, res) => {
    console.log(req.params);
    mysqlConnection.query(`DELETE FROM program WHERE ProgramID = ${req.params.Id}`, (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

Router.get("/updateprogram/:Id/:Duration", async (req, res) => {
    console.log(req.params);
    mysqlConnection.query(`UPDATE program SET Duration = ${req.params.Duration} WHERE ProgramID = ${req.params.Id}`, (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

Router.get("/rightjoin", async (req, res) => {
    mysqlConnection.query("SELECT * FROM mentee RIGHT JOIN account on mentee.MenteeID=account.MenteeID", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

Router.get("/leftjoin", async (req, res) => {
    mysqlConnection.query("SELECT * FROM mentornickname LEFT JOIN mentor on mentor.name=mentornickname.name", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

Router.get("/outerjoin", async (req, res) => {
    mysqlConnection.query("SELECT * FROM workoutday LEFT JOIN movement ON workoutday.WorkoutDayID = movement.WorkoutDayID UNION SELECT * FROM workoutday RIGHT JOIN movement ON workoutday.WorkoutDayID = movement.WorkoutDayID", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

export default Router;