// Reminder that all of this is just suggestion, feel free to do things your way!
const fs = require("fs");

const QUOTES = "./server/data/quotes.txt";
const TYPE = "utf8";

const cache = null;

const read = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(QUOTES, TYPE, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const splitData = data.split(/(.*\S)\s*~\s*(\S+(.*\S+)*)/g);
        const arrayQuotes = [];
        for (let i = 1; i < splitData.length; i += 4) {
          const jsonQuote = {
            text: splitData[i],
            author: splitData[i + 1],
          };
          arrayQuotes.push(jsonQuote);
        }
        resolve({ quotes: arrayQuotes });
      }
    });
  });
};

const send = (res, code, data, json = true) => {
  // send a response
  res.status(code).send(json ? JSON.stringify(data) : data);
};

module.exports = { read, send };
