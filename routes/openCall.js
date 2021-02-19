var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//GET openCall info
router.get("/:id/info", function (req, res) {
  const { id } = req.params;
  db(
    `SELECT openCall.residency_name,openCall.description, openCall.status, candidats.full_name, candidats.email, candidats.project, gallery.name FROM openCall JOIN candidats ON candidats.residency_id = openCall.id JOIN gallery ON openCall.gallery_id = gallery.id WHERE openCall.id="${id}";`
  )
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET candidats of that opencall
router.get("/:id/candidats", function (req, res) {
  const { id } = req.params;
  db(`SELECT * FROM candidats WHERE residency_id="${id}"`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

//POST project
router.post("/:id/candidats", function (req, res) {
  const { id } = req.params;
  const { full_name, project, email } = req.body;
  db(
    `INSERT INTO candidats (full_name, project, email, residency_id) VALUES ("${full_name}", "${project}","${email}", "${id}");`
  )
    .then(res.send({ message: "Project uploaded" }))
    .catch((err) => res.status(500).send(err));
});

//GET open Call by id
router.get("/:id", function (req, res) {
  const { id } = req.params;
  db(
    `SELECT openCall.residency_name, openCall.id, openCall.description, openCall.status, gallery.name FROM openCall JOIN gallery ON openCall.gallery_id = gallery.id WHERE openCall.id="${id}";`
  )
    //
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

//EDIT open Call by id
router.put("/:id", function (req, res) {
  const { id } = req.params;
  const { gallery_id, status } = req.body;
  db(
    `UPDATE openCall SET gallery_id="${gallery_id}", status="${status}" WHERE id="${id}";`
  )
    .then(res.send({ message: "status updated" }))
    .catch((err) => res.status(500).send(err));
});

//DELETE open Call by id
router.delete("/:id", function (req, res) {
  const { id } = req.params;
  db(`DELETE FROM openCall WHERE id="${id}";`)
    .then(res.send({ message: "project deleted" }))
    .catch((err) => res.status(500).send(err));
});

// GET all open Calls + Gallery name
router.get("/", function (req, res) {
  db(
    "SELECT openCall.residency_name, openCall.description, openCall.status, openCall.id, gallery.name FROM openCall JOIN gallery ON openCall.gallery_id = gallery.id;"
  )
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});
//POST open Call
router.post("/", function (req, res) {
  const { residency_name, gallery_id, description } = req.body;
  db(
    `INSERT INTO openCall (residency_name, gallery_id, description, status) VALUES ("${residency_name}", "${gallery_id}", "${description}", "1");`
  )
    .then(res.send({ message: "Open Call uploaded successfully" }))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
