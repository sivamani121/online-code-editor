const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const helmet = require("helmet");

const bodyParser = require("body-parser");
const connection = require("./controllers/Database");
const codeRouter = require("./Routes/CodeRouter");
const databaseRouter = require("./Routes/databaseRoutes");


const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(helmet());


app.use("/code", codeRouter);
app.use("/database", databaseRouter);
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
