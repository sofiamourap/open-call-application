var express = require("express");
var router = express.Router();
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const db = require("../model/helper");

//GET candidats of that opencall
router.get("/:id/candidats", userShouldBeLoggedIn, function (req, res) {
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

//DELETE candidat
router.delete("/:id/candidats/:candidat_id", function (req, res) {
  const { id } = req.params;
  const { candidat_id } = req.params;
  db(`DELETE FROM candidats WHERE id="${candidat_id}";`)
    .then(res.send({ message: "candidat deleted" }))
    .catch((err) => res.status(500).send(err));
});

//GET open Call by id
router.get("/:id", function (req, res) {
  const { id } = req.params;
  db(
    `SELECT openCall.residency_name, openCall.id, openCall.gallery_id, openCall.description, openCall.status, gallery.name FROM openCall JOIN gallery ON openCall.gallery_id = gallery.id WHERE openCall.id="${id}";`
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
  const { status } = req.body;
  db(`UPDATE openCall SET status="${status}" WHERE id="${id}";`)
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

// GET all open Calls + Gallery name and gallery_id
router.get("/", function (req, res) {
  db(
    "SELECT openCall.residency_name, openCall.description, openCall.gallery_id, openCall.status, openCall.id, gallery.name FROM openCall JOIN gallery ON openCall.gallery_id = gallery.id;"
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
