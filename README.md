# Node.js: Using Express to Build a RESTful API
### This was created during my time as a [Code Chrysalis](https://codechrysalis.io) Student

## Table of Contents

1.  [Introduction](#introduction)
1.  [Overview of Topics](#overview-of-topics)
    1.  [Node](#node)
    1.  [Express](#express)
    1.  [REST](#rest)
1.  [Environment](#environment)
    1.  [Installing Node](#installing-node)
    1.  [Installing Dependencies and Startup](#installing-dependencies-and-startup)
1.  [Objectives & Instructions](#objectives-and-instructions)
    1.  [Basic Requirements](#basic-requirements)
    1.  [Advanced Requirements](#advanced-requirements)
    1.  [Nightmare Mode](#nightmare-mode)
1.  [Resources](#resources)
1.  [Contributing](#contributing)

## Introduction

In this repo, we will be using [Node's](https://en.wikipedia.org/wiki/Node.js) popular [Express](https://en.wikipedia.org/wiki/Express.js) framework. This will abstract a significant amount of the setup away from us, but implementation of your controllers will require familiarity with Node.js.

## Overview of Topics

### Node

JavaScript has traditionally been the language of web applications, and so far we've been using it for that purpose (in the browser!). However, in 2007 Node was introduced as an alternative to allow JavaScript to be run in a server environment, indepedent of a browser. Node is implemented using the the open-source [Chrome V8 JavaScript engine](https://en.wikipedia.org/wiki/Chrome_V8) developed by Google.

Just like the browser, Node.js comes with a few global objects, mostly related to the terminal. Examples include things like `process.env` variables. However, some globals you may be accustomed to from working in the browser will be missing, such as the `window` and `document` objects, since there generally isn't a DOM to interact with when working in Node.

### Express

You will also see a variety of 'middleware' libraries managed by Express, and will even be free to add your own as you desire. You can learn more about Express as a middleware framework [here](https://expressjs.com/en/guide/using-middleware.html).

### REST

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer), or REpresentational State Transfer, is an architectural style that says that [Application Programming Interfaces](https://en.wikipedia.org/wiki/Application_programming_interface) should be both stateless and explicity implement [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). RESTful APIs generally transfer information using [JSON](http://www.json.org/), and rely on [HTTP verbs](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) to express a CRUD intent.

An alternative to REST is Simple Object Access Protocol, or SOAP, which while somewhat less ubiquitous and popular, is also an industry standard. You can learn more about the differences in the two architectures [here](https://blog.smartbear.com/apis/understanding-soap-and-rest-basics/).

## Environment

To check if Node is installed on your computer, please simply type the command `node` in your terminal.

Node should already be installed on the pairing stations, but if you are installing this on your local machine, please

### Installing Node

If you are installing on your personal computer, we highly recommend installing node and npm using [Homebrew](https://brew.sh/) if you are on MacOS.

Otherwise, [Node](https://nodejs.org/en/) can be installed via npm and other package managers, either locally or globally, but I recommend you get the latest version from their website. However, if you wish to install via npm, it can done with `npm i -g node`.

Once installed, you should be able to use Node in your terminal using the `node` command.

### Getting Comfortable with Your Environment

The node terminal works somewhat like the various browser consoles you're likely familiar with. Try assigning some variables and running a few simple commands like `[1,2,3].reduce((a,b)=>a+b)`.

As you may notice, Node supports most, but not all, ES6 syntax. HTTP functionality found in browser environments like `fetch` or `xmlHttpRequest` is generally not included in Node, so for any such queries you'll need to find a suitable HTTP client like [Axios](https://github.com/mzabriskie/axios) or [Request](https://github.com/request/request).

BUT DON'T WORRY ABOUT THAT JUST YET!

You shouldn't need to do any external queries for the scope of this project.

### Exiting Node

You can get out of the Node terminal with `.exit`, or by pressing `ctrl+c` twice.

### Installing Dependencies and Startup

Example:

To install dependencies:

```bash
  yarn
```

To run tests:

```bash
  yarn test
```

To run eslint:

```bash
  yarn eslint
```

To run the app in development:

```bash
  yarn dev
```

To run the app in production:

```bash
  yarn start
```

## Objectives and Instructions

### Objectives

* Set up API end points for some quotes!
* Be able to implement API end points in Express
* Get familiar with the different middleware and modules that Express provides (like Router)

### Things to Explore

1.  [Chai Http](https://github.com/chaijs/chai-http) is a cool library. You don't need to read too deeply into it, but we suggest reading through the tests to get yourself acquainted with what the library does.
1.  [The `router` object](https://expressjs.com/en/4x/api.html#express.router) and what it does. You'll find this in the `server/resources/api.router.js` file. The method `Router()` (which is attached to express), creates a new [`router` object](https://expressjs.com/en/4x/api.html#router). Read about the methods on the `router` object.
1.  [fs (aka the file system module)](https://nodejs.org/api/fs.html#fs_file_system). This little module will be appearing in the `server/resources/api.controller.js` file. It's a really handy little tool that will allow you to manipulate and make changes to files. Node comes with fs and you install it by writing `require('fs')` to 'require' it into your code.
1.  [chalk!](https://github.com/chalk/chalk) found in `server/resources/test.js` is a simple but nifty library you may want to remember for the future! It's **not at all important** for the understanding of this sprint, so don't get too caught up with it. It's a fun tool that we can use later on in Node :)

### Basic Requirements

Your task is to build a Quotes API for providing interesting quotes to users. Detailed basic requirements can be found in the tests included with the repo.

You can find the tests in `test/test.js`. Many tests are disabled using the `x` prefix to `describe` and `it`. You should enable these tests in order as you complete each section. A few tests you will need to write yourself, and you are also encouraged to come up with your own tests along the way.

Your quotes should be stored in a persistent `.txt` file located in `server/data`. A starting `quotes.txt` file has been provided for you there. You will want to use Node's [File System module](https://nodejs.org/api/fs.html) to work with reading and writing local files, see the docs for more information.

A list of basic routes have been provided for you, though you may need to create more. Refer to the test file for more information.

#### `read` function

* [ ] Complete the `read` function in `server/resources/api.controller.js`
      `read` takes a single callback function. `read` should detect whether there is any error and otherwise run the callback, passing the callback two arguments: an `error` object and an object containing a data object.
      We have provided a variable `cache` which is set to `null` initially. The `read` function should check if the cache is empty (`null`) and read our quotes file, taking the data and storing it in our cache. This is our simple way of creating some in memory :).

  A few things may be useful for you:

  * Regex (Regular Expressions) will be useful in helping you parse through the `quotes.txt` file given. In particular, you should check out using `/(.*\S)\s*~\s*(\S+(.*\S+)*)/` with String's [`match` method](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/match). Don't worry too much about learning Regex. It's a lengthy topic for another time.
  * The output for `read` should be an array of objects
  * You may want to check out the arguments that the `fs.readFile` method expects and what arguments the method will pass into a given callback. Those arguments are what you need.
  * When you get an error, it's often useful to console.log the err.

#### GET /api/quotes

* [ ] Uncomment the tests for this!
* [ ] Uncomment the relevant route in `server/resources/api.router.js`
      Side note: Why don't we need to say `api/quotes` in our `api.router.js` file? The answer is in `server.js`.
* [ ] Create a method in `server/resources/api.controller.js` and link it to our `api.router.js` file.

  A few things may be useful for you:

  * Looking into [`req.query`](http://expressjs.com/en/api.html#req.query) will help you pass the last test in there and help you with writing the rest of the endpoints.
  * You may want to "send" not just the aggregated data created by your `read` functino above, but maybe also provide a `length` property. Look at the very last test for this section (should allow an author parameter).
  * You may want to write a function called `filter` or something to that extent. It should take given queries or parameters and filter those objects out of the data. For example, if someone makes a request for the quotes only of specific people, you may want to find a way to filter your data.

#### GET /api/quotes/random

* [ ] Uncomment the tests for this!
* [ ] Uncomment the relevant route in `server/resources/api.router.js`
* [ ] Create a method and link it to our router

#### POST /api/quotes

* [ ] Uncomment the tests for this!
* [ ] Uncomment the relevant route in `server/resources/api.router.js`
* [ ] Write the relevant tests needed!
* [ ] Create a method and link it to our router

  A few things may be useful for you:

  * Looking into [`req.body`](http://expressjs.com/en/api.html#req.body) will be a good way to learn about how you can retrieve the information being sent to you to post.
  * `fs.appendFile` is useful.
  * This entry point is used to add a new quote to the existing quotes
  * Remember to use your cache!

#### PUT /api/quotes

* [ ] Uncomment the tests for this!
* [ ] Uncomment the relevant route in `server/resources/api.router.js`
* [ ] Write the relevant tests needed!
* [ ] Create a method and link it to our router

A few things may be useful for you:

* [`fs.writeFile`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) will be useful.
* This entry point is used to overwrite the existing quotes with new quotes

### Advanced Requirements

Learn how to [serve static files with Express](https://expressjs.com/en/starter/static-files.html). Use what you learn to create a front-end documentation for your API that will be provided when accessing the root url.

This is easiest done by simply serving client files created with familiar frameworks like React, but I encourage you to learn more about EJS and JavaScript templating. Here is a [useful tutorial](https://coligo.io/templating-node-and-express-apps-with-ejs/) to get you started. A views folder, some helpful commented code in `server/server.js`, as well as the necessary npm dependencies have been included for your convenience.

### Nightmare Mode

Attempt this project without using Express. A primer for using 'vanilla' node can be found [here](http://www.nodebeginner.org/#a-basic-http-server).

## Other Resources

* [Testing Node with mocha and chai](https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai)
* [Node v0.10.x Documentation](https://nodejs.org/docs/latest-v0.10.x/api/)
* [Express v4.x Documentation](https://expressjs.com/en/api.html)
* [Chai Assertion Library](http://chaijs.com/api/)
* [EJS Documentation](http://ejs.co/)

## Contributing

See a problem? Can something be done better? [Contribute to our curriculum](mailto:hello@codechrysalis.io)!
