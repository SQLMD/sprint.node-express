// Reminder that all of this is just suggestion, feel free to do things your way!
const fs = require("fs");

const QUOTES = "./server/data/quotes.txt";
const TYPE = "utf8";

let cache = null;
function reverse(data) {
  let str = "";
  for (let i = 0; i < data.length; i++) {
    str += `${data[i].text} ~${data[i].author}\n`;
  }
  return str.slice(0, -2);
}

const add = (text, author) => {
  return new Promise((resolve, reject) => {
    const quote = { text, author };
    if (quote.author === undefined) {
      quote.author = "Anonymous";
    }
    fs.appendFile(QUOTES, quote, TYPE, (err) => {
      if (err) reject(err);
      else {
        cache.quotes.push(quote);
        resolve(cache);
      }
    });
  });
};

const edit = (data) => {
  const strData = reverse(data);
  return new Promise((resolve, reject) => {
    console.log(data);
    fs.writeFile(QUOTES, strData, (err) => {
      if (err) reject(err);
      else {
        cache.quotes = data;
        resolve(cache);
      }
    });
  });
};

const read = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(QUOTES, TYPE, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (cache === null) {
          const splitData = data.split(/(.*\S)\s*~\s*(\S+(.*\S+)*)/g);
          const arrayQuotes = [];
          for (let i = 1; i < splitData.length; i += 4) {
            const jsonQuote = {
              text: splitData[i],
              author: splitData[i + 1],
            };
            arrayQuotes.push(jsonQuote);
          }
          cache = { quotes: arrayQuotes };
        }
        resolve(cache);
      }
    });
  });
};

const send = (res, code, data, json = true) => {
  // send a response
  res.status(code).send(json ? JSON.stringify(data) : data);
};

module.exports = { read, send, add, edit };
