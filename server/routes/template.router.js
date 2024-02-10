const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const sqlText = `SELECT * FROM "services"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const sqlText = `INSERT INTO "services" (image, service, total_cost, description)
    VALUES ($1, $2, $3, $4)`;
  const sqlParams = [
    req.body.image,
    req.body.service,
    req.body.total_cost,
    req.body.description,
  ];

  pool
   .query(sqlText, sqlParams)
   .then((result) => {
      res.sendStatus(201);
    })
   .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});


module.exports = router;
