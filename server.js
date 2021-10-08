const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3200;
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Deepanshu",
  database: "testData",
});
// const pool = mysql.createPool(database);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
database.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
  database.query("SELECT * FROM userDetails", function (err, rows, fields) {
    if (err) throw err;
    rows = rows;
    // console.log(JSON.parse(JSON.stringify(rows)));
  });

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });
  app.get("/", (req, res) => {
    database.query("SELECT * FROM userDetails", function (err, rows, fields) {
      if (err) throw err;
      let sortedArray = rows.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      res.send(sortedArray);
      // console.log(JSON.parse(JSON.stringify(rows)))
    });
  });
  app.get("/productDetails", (req, res) => {
    database.query(
      "SELECT * FROM productDetails",
      function (err, rows, fields) {
        // database.query("insert into productDetails (productName,cost) values ('Samsung s20','90000')", function (err, rows, fields) {
        if (err) throw err;
        let sortedArray = rows.sort(function (a, b) {
          return a.productName.localeCompare(b.productName);
        });
        res.send(sortedArray);
      }
    );
  });
  app.delete("/deleteProduct", (req, res) => {
    console.log("delte clld");
    database.query(
      `delete from productDetails WHERE ProductId = '${req.query.ProductId}'`,
      function (err, rows, fields) {
        // database.query("insert into productDetails (productName,cost) values ('Samsung s20','90000')", function (err, rows, fields) {
        if (err) throw err;
        res.send({ responseCode: 1, resp: "Data Deleted Successfully" });
      }
    );
  });
  app.use("/products", function (req, res, next) {
    if (req.body.productName != undefined) {
      next();
    } else {
      res.send({ responseCode: 0, resp: "Bad Request" });
    }
    console.log("Request Type:", req.method);
  });
  app.post("/products", (req, res) => {
    console.log("body", req.body.productName);
    database.query(
      `INSERT INTO productDetails (productName,cost) VALUES('${req.body.productName}', '${req.body.cost}')`,
      function (err, rows) {}
    );
    database.query(
      `INSERT INTO userDetails (name,surname,age) VALUES('${req.body.firstName}','${req.body.lastName}','${req.body.age}')`,
      function (err, rows) {
        if (err) throw err;

        res.send({ responseCode: 1, resp: "Data added Successfully" });
      }
    );
  });

  // app.post('/products', (req, res) => {
  //     console.log(req.body);

  //     database.query(`INSERT INTO productDetails (productName,cost) VALUES('${req.productName}', '${req.cost}')`, function (err, rows) {

  //         if (err) throw err

  //         res.send({ responseCode: 1, resp: "Data added Successfully" });

  //     });
  //     database.query(`INSERT INTO userDetails (name,surname,age) VALUES('${req.firstName}','${req.lastName}','${req.query.age}')`, function (err, rows) {
  //         if (err) throw err

  //         res.send({ responseCode: 1, resp: "Data added Successfully" });

  //     });

  // });

  app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
  });
});
