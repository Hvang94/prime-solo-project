const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.isAuthenticated() || !req.user) {

    return res.sendStatus(401);
  }

  const isAdmin = req.user.admin;

  let sqlText = `
  SELECT a.id as appointment_id, s.service, s.description, s.cost, a.status, a.date, u.username
  FROM "appointments" a
  JOIN "services" s ON a.service_id = s.id
  JOIN "user" u ON a.user_id = u.id
`;

  const sqlParams = [];

 
  if (!isAdmin) {
    sqlText += ` WHERE a.user_id = $1`;
    sqlParams.push(req.user.id); 
  }

  
  sqlText += ` ORDER BY a.date ASC;`;

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
      console.log(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log("Request body:", req.body);

  const clientService = req.body;
  const sqlText = `INSERT INTO "appointments" ("user_id", "service_id", "status", "date") VALUES ($1, $2, $3, $4)`;
  const sqlParams = [
    clientService.user_id,
    clientService.service_id,
    clientService.status,
    clientService.date,
  ];

  console.log("SQL Parameters:", sqlParams);

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
  const newDate = req.body.date;
  const sqlText = `UPDATE "appointments" SET "date" = $1 WHERE id = $2`;
  const sqlParams = [newDate, updateService];

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
  const appointmentId = req.params.id;

  console.log(appointmentId);
  const status = req.body.status;
  const sqlText = `UPDATE "appointments" SET "status" = $1 WHERE id = $2`;
  const sqlParams = [status, appointmentId];

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
