
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const { createDb } = require("./src/db/dbconnection");
const router = require("././src/routes/v1/user.route");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

createDb();

app.use("/v1", router);

app.use(express.static(`./public`));
server.listen(process.env.PORT, () => {
  console.log(`server is done ${3000}`);
});
