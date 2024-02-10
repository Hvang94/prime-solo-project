const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const sqlText = `SELECT * FROM "client_services" ORDER BY date ASC`;
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
  const sqlText = `INSERT INTO "client_services" ("image", "service", "total_cost", "description", "date") VALUES ($1, $2, $3, $4, $5)`;
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
  const sqlText = `DELETE FROM "client_services" WHERE id = $1`;
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
  const sqlText = `UPDATE "client_services" SET "date" = $1 WHERE id = $2`;
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
  const sqlText = `UPDATE "client_services" SET "confirmed" = $1 WHERE id = $2`;
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
