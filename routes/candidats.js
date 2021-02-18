var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all projects posted by the candidats
router.get("/", function (req, res, next) {
  db("SELECT * FROM candidats;")
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET candidats by id
router.get("/:id", function (req, res) {
  const { id } = req.params;
  db(`SELECT * FROM candidats WHERE id=${id}`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

//EDIT status of the uploaded project. false = not selected, true = selected
router.put("/:id", function (req, res) {
  const { id } = req.params;
  const { status } = req.body;
  db(`UPDATE candidats SET status="${status}" WHERE id="${id}";`)
    .then(res.send({ message: "status updated" }))
    .catch((err) => res.status(500).send(err));
});

//DELETE a project
router.delete("/:id", function (req, res) {
  const { id } = req.params;
  db(`DELETE FROM candidats WHERE id="${id}";`)
    .then(res.send({ message: "project deleted" }))
    .catch((err) => res.status(500).send(err));
});

//create a module that checks if the id is valid
module.exports = router;
