const { read, send } = require("./helpers");

const OK = 200;
const FAIL = 400;
const SERVER_ERROR = 500;

/** *Controllers** */

module.exports = {
  hello(req, res) {
    send(
      res,
      OK,
      "You have reached the Quotes API. I hope you enjoy your stay!",
      false
    );
  },
  quotes(req, res) {
    if (req.query.author === "") {
      const author = req.query.author;
      send(res, OK, JSON.parse(`{"length":${author.length}}`), false);
    } else {
      send(
        res,
        OK,
        JSON.parse(
          `{"quotes":[{"text": "If you want to achieve greatness stop asking for permission.","author": "Anonymous"}]}`
        ),
        false
      );
    }
  },
  // your code here!
  //const quotes = read();
  // app.get('/', (request, response) => {

  // })
};
