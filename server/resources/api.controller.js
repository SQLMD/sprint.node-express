const { read, send } = require("./helpers");

const OK = 200;
const FAIL = 400;
const SERVER_ERROR = 500;

/** *Controllers** */

function searchQuoteAuthors(jsonObj, author) {
  const quoteList = jsonObj.quotes;
  for (let i = 0; i < quoteList.length; i++) {
    if (quoteList[i].author === author) {
      return quoteList[i].text;
    }
    return "";
  }
}
function getRandomQuote(jsonObj) {
  const quoteList = jsonObj.quotes;
  const randomNum = Math.ceil(Math.random() * quoteList.length - 1);
  return quoteList[randomNum];
}
module.exports = {
  hello(req, res) {
    read();
    send(
      res,
      OK,
      "You have reached the Quotes API. I hope you enjoy your stay!",
      false
    );
  },
  quotes(req, res) {
    read().then((data) => {
      const author = req.query.author;
      const text = searchQuoteAuthors(data, author);
      if (req.query.author) {
        send(res, OK, text, true);
      } else {
        send(res, OK, data, false);
      }
    });
  },
  randomQuote(req, res) {
    read().then((data) => {
      const text = getRandomQuote(data);
      send(res, OK, text, true);
    });
  },
  // your code here!
  //const quotes = read();
  // app.get('/', (request, response) => {

  // })
};
