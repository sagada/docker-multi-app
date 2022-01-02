const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());

db.pool.query(
  `CREATE TABLE lists(
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`,
  (err, results, fileds) => {
    console.log("results", results);
  }
);

app.listen(5000, () => {
  console.log("애플리케이션이 5000번 포트에서 시작 되었습니다.");
});

app.get("/api/values", function (req, res) {
  console.log("GET /api/values");
  db.pool.query("SELECT * FROM lists;", (err, results, fildes) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

app.post("/api/value", function (req, res, next) {
  console.log("POST /api/value");
  db.pool.query(
    `INSERT INTO lists(value) VALUES("${req.body.value}")`,
    (err, results, fildes) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

app.delete("/api/values", function (req, res, next) {
  console.log("DELETE /api/values");
  db.pool.query(`DELETE FROM lists where id >0 ;`, (err, results, fieldes) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json({ success: true, value: req.body.value });
    }
  });
});
