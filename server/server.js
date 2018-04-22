/** *Express setup** */
const express = require("express");

const app = express();

/** *Middleware Dependencies** */
const morgan = require("morgan"); // logger middleware
const bodyParser = require("body-parser"); // used for parsing requests

// const ejsLayouts = require('express-ejs-layouts');
// const path = require('path'); //convenient middleware for constructing URIs

/** *Other Dependencies** */
const apiRouter = require("./resources/api.router");

app.use("/api/", [
  // add additional middleware to the server, mounted on the /api/ path
  bodyParser.json(), // enables parsing of application/json request bodies
  bodyParser.urlencoded({ extended: true }), // enables parsing of application/x-www-form-urlencoded data
  apiRouter,
]);

if (process.env.NODE_ENV !== "test") {
  // run morgan middelware's development mode; detailed, colored dev log
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
  // this might be a good place to put your ejs if you make it to the advanced requirements
  // app.use(express.static(path.join(__dirname, '../public')));
}

module.exports = app;
