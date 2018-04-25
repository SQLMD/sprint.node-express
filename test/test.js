/* eslint-disable prefer-destructuring, no-console, no-restricted-syntax */
const PORT = process.env.PORT || 3000;
const should = require("chai").should();
const fs = require("fs");
const quotes = require("./quotes.json");
const app = require("../server/server.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chalk = require("chalk");

app.listen(PORT, () =>
  console.log(
    // sets server to listen to PORT and outputs to the CL
    chalk.yellow.bold("Test server listening on port: ") + chalk.cyan.bold(PORT)
  )
);

chai.use(chaiHttp);

describe("GET /api", () => {
  let status;
  let response;

  before((done) => {
    chai
      .request(app)
      .get("/api")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        status = res.statusCode;
        response = res.text;
        done();
      });
  });

  it("should return status 200.", (done) => {
    status.should.equal(200);
    done();
  });

  it("should provide a welcome message.", (done) => {
    response.should.be.a("string");
    done();
  });
});

describe("GET /api/quotes", () => {
  let status;
  let response;
  let responseQuotes;

  before((done) => {
    chai
      .request(app)
      .get("/api/quotes")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        status = res.status;
        response = res.text;
        done();
      });
  });

  it("should return status 200.", (done) => {
    status.should.equal(200);
    done();
  });

  it("should be a JSON object.", (done) => {
    response.should.be.a("string");
    response = JSON.parse(response);
    response.should.be.an("object");
    done();
  });

  it('should have a "quotes" property containing an array.', (done) => {
    response.should.have.a.property("quotes").that.is.an("array");
    responseQuotes = response.quotes;
    done();
  });

  it('should contain only quotes with both "text" and an "author".', (done) => {
    for (const quote of responseQuotes) {
      quote.should.be.an("object");
      quote.should.have.a.property("text");
      quote.should.have.a.property("author");
      quote.text.should.not.equal("");
      quote.author.should.not.equal("");
    }
    done();
  });

  it("should allow an author parameter.", (done) => {
    chai
      .request(app)
      .get("/api/quotes?author=''")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        JSON.parse(res.text).length.should.equal(0);
        done();
      });
  });
});

describe("GET /api/quotes/random", () => {
  let status;
  let response;

  before((done) => {
    chai
      .request(app)
      .get("/api/quotes")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        status = res.status;
        response = res.text;
        done();
      });
  });

  it("should return status 200.", (done) => {
    status.should.equal(200);
    done();
  });

  it("should be a JSON object.", (done) => {
    response.should.be.a("string");
    response = JSON.parse(response);
    response.should.be.an("object");
    done();
  });

  it("should be random", (done) => {
    let a;
    let b;
    chai
      .request(app)
      .get("/api/quotes/random")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        a = res.text;
        chai
          .request(app)
          .get("/api/quotes/random")
          .set("Content-Type", "application/json")
          .end((error, result) => {
            b = result.text;
            a.should.not.equal(b);
            done();
          });
      });
  });
});

describe("POST/PUT Tests", () => {
  // This is to make sure each test is run under with the same starting data
  const quotesFile = "./server/data/quotes.txt";
  const quotesBackup = `${quotesFile}.bak`;

  beforeEach(() => {
    fs.createReadStream(quotesFile).pipe(fs.createWriteStream(quotesBackup));
  });

  afterEach(() => {
    fs.createReadStream(quotesBackup).pipe(fs.createWriteStream(quotesFile));
    fs.unlinkSync(quotesBackup);
  });

  describe("POST /api/quotes", () => {
    before((done) => {
      chai
        .request(app)
        .put("/api/quotes")
        .set("Content-Type", "application/json")
        .send(quotes)
        .end(() => {
          done();
        });
    });

    after((done) => {
      chai
        .request(app)
        .put("/api/quotes")
        .set("Content-Type", "application/json")
        .send(quotes)
        .end(() => {
          done();
        });
    });

    const appendData = {
      text: "Wubba lubba dub dub!",
      author: "Rick Sanchez",
    };

    it('should return status 400 if "text" is empty.', (done) => {
      chai
        .request(app)
        .post("/api/quotes")
        .set("Content-Type", "application/json")
        .send({
          text: "",
        })
        .end((_, res) => {
          res.status.should.equal(400);
          done();
        });
    });

    it("should append new entries to the end of the file.", (done) => {
      chai
        .request(app)
        .post("/api/quotes")
        .set("Content-Type", "application/json")
        .send(appendData)
        .end(() => {
          chai
            .request(app)
            .get("/api/quotes")
            .set("Content-Type", "application/json")
            .end((error, result) => {
              JSON.parse(result.text)
                .quotes.pop()
                .should.deep.equal(appendData);
              done();
            });
        });
    });

    xit('should fill in blank or missing authors with "Anonymous".', (done) => {
      // Your code here!
    });
  });

  xdescribe("PUT /api/quotes", () => {
    let status;

    before((done) => {
      chai
        .request(app)
        .put("/api/quotes")
        .set("Content-Type", "application/json")
        .send(quotes)
        .end((_, res) => {
          status = res.status;
          done();
        });
    });

    it("should return a 200 status.", (done) => {
      status.should.equal(200);
      done();
    });

    xit("should overwrite the existing quote file.", (done) => {
      chai
        .request(app)
        .get("/api/quotes")
        .set("Content-Type", "application/json")
        .end((_, res) => {
          JSON.parse(res.text).quotes.should.deep.equal(quotes);
          done();
        });
    });

    xit('should return status 400 if "text" is empty.', (done) => {
      chai
        .request(app)
        .put("/api/quotes")
        .set("Content-Type", "application/json")
        .send([
          {
            text: "",
          },
        ])
        .end((_, res) => {
          res.status.should.equal(400);
          done();
        });
    });

    xit('should fill in blank or missing authors with "Anonymous".', (done) => {
      // Your code here!
    });

    xit("should clear the file if passed an empty request body");
  });
});
