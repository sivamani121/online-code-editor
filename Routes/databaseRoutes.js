const express = require("express");
const databaseRouter = express.Router();
const databaseController = require("./../controllers/Database");
databaseRouter.post("/save", databaseController.addRow);
databaseRouter.get("/retrive", databaseController.retrieveRows);
module.exports = databaseRouter;
