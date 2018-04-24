// Reminder that all of this is just suggestion, feel free to do things your way!
const fs = require("fs");

const QUOTES = "./server/data/quotes.txt";
const TYPE = "utf8";

const cache = null;

const read = (callback) => {
  const result = [];

  const quotesText = fs.readFile(QUOTES, TYPE, (err, result) => {
    if (err) {
      return err;
    }
    return callback(result);
  });
};

const send = (res, code, data, json = true) => {
  // send a response
  res.status(code).send(json ? JSON.stringify(data) : data);
};

module.exports = { read, send };
