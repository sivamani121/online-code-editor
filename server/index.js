const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const connection = require("./controllers/Database");
const codeRouter = require("./Routes/CodeRouter");
const databaseRouter = require("./Routes/databaseRoutes");
const buildPath = path.join(__dirname, "build");

// Close MySQL connection

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use("/code", codeRouter);
app.use("/database", databaseRouter);
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
