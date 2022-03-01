import express from "express";
import controller from "../controllers/people.js";

const Router = express.Router();

Router.get("/", controller.getPeople);

export default Router;