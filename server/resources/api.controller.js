const { read, send } = require("./helpers");

const OK = 200;
const FAIL = 400;
const SERVER_ERROR = 500;

/** *Controllers** */

function searchQuoteAuthors(jsonObj, author) {
  const quoteList = jsonObj.quotes;
  for (let i = 0; i < quoteList.length; i++) {
    //console.log(quoteList[i].author);
    if (quoteList[i].author === author) {
      return quoteList[i].text;
    }
    return "";
  }
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
    // read();

    const author = req.query.author;
    const text = searchQuoteAuthors(read(), author);

    if (req.query.author) {
      send(res, OK, text, true);
    } else {
      send(res, OK, read(), false);
    }
  },
  // your code here!
  //const quotes = read();
  // app.get('/', (request, response) => {

  // })
};
