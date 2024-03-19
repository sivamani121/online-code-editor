const express = require("express");
const codeRouter = express.Router();
const codeController = require("./../controllers/CodeController");
codeRouter.post("/submit", codeController.createSubmit);
codeRouter.post("/output", codeController.getSubmit);
module.exports = codeRouter;
