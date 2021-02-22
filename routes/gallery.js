var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all galleries
router.get("/", function (req, res) {
  db("SELECT * FROM gallery;")
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET gallery info + openCalls
router.get("/:id/opencalls", function (req, res) {
  const { id } = req.params;
  db(
    `SELECT gallery.id, gallery.name, gallery.country, gallery.city, openCall.residency_name FROM gallery JOIN openCall ON openCall.gallery_id =gallery.id WHERE gallery.id=${id};`
  )
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET Gallery by id
router.get("/:id", function (req, res) {
  const { id } = req.params;
  c;
  db(`SELECT * FROM gallery WHERE id="${id}";`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

//POST a new gallery
router.post("/", function (req, res) {
  const { name, country, city } = req.body;
  db(
    `INSERT INTO gallery (name, country, city) VALUES ("${name}", "${country}", "${city}");`
  )
    .then(res.send({ message: "Gallery uploaded successfully" }))
    .catch((err) => res.status(500).send(err));
});

//DELETE a gallery
router.delete("/:id", function (req, res) {
  const { id } = req.params;
  db(`DELETE FROM gallery WHERE id="${id}";`)
    .then(res.send({ message: "gallery deleted" }))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
