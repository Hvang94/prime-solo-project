const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

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
  const sqlText = `INSERT INTO "services" (image, service, cost, description)
    VALUES ($1, $2, $3, $4)`;
  const sqlParams = [
    req.body.image,
    req.body.service,
    req.body.cost,
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

router.delete("/:id", (req, res) => {
  const sqlText = `DELETE FROM "services" where "id" = $1`;
  const deleteService = req.params.id;
  const sqlParams = [deleteService];
  pool
    .query(sqlText, sqlParams)

    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:id", (req, res) => {
  const serviceId = req.params.id; 
  const { image, service, cost, description } = req.body; 
  const sqlText = `UPDATE "services" SET "image" = $1, "service" = $2, "cost" = $3, "description" = $4 WHERE "id" = $5`;
  const sqlParams = [image, service, cost, description, serviceId];

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
