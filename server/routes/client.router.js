const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const sqlText = `SELECT * FROM "appointments" ORDER BY date ASC`;
  // ! rename client_services to appointment and change DB name
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

router.get("/", (req, res) => {
  const sqlText = `SELECT * FROM "appointments" ORDER BY date ASC`;
// ! change sqlText to join user and appointments where id = user_id
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
  const clientService = req.body;
  const sqlText = `INSERT INTO "appointments" ("image", "service", "total_cost", "description", "date") VALUES ($1, $2, $3, $4, $5)`;
  const sqlParams = [
    clientService.image,
    clientService.service,
    clientService.total_cost,
    clientService.description,
    clientService.date,
  ];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  const deleteService = req.params.id;
  const sqlText = `DELETE FROM "appointments" WHERE id = $1`;
  pool
    .query(sqlText, [deleteService])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.patch("/:id", (req, res) => {
  const updateService = req.params.id;
  const clientService = req.body.date;
  const sqlText = `UPDATE "appointments" SET "date" = $1 WHERE id = $2`;
  const sqlParams = [
    clientService,
    updateService
  ];

  pool
   .query(sqlText, sqlParams)
   .then((result) => {
      res.sendStatus(200);
    })
   .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const updateService = req.params.id;
  const clientService = req.body.confirmed;
  const sqlText = `UPDATE "appointments" SET "confirmed" = $1 WHERE id = $2`;
  const sqlParams = [
    clientService.date,
    updateService
  ];

  pool
   .query(sqlText, sqlParams)
   .then((result) => {
      res.sendStatus(200);
    })
   .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
