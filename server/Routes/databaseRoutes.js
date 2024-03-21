const express = require("express");
const databaseRouter = express.Router();
const databaseController = require("./../controllers/Database");
databaseRouter.post("/save", databaseController.addRow);
databaseRouter.get("g", databaseController.retrieveRows);
module.exports = databaseRouter;
