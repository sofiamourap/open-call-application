var express = require("express");
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

// POST/REGISTER a new gallery
router.post("/register", async (req, res) => {
  const { name, country, city, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO gallery (name, country, city, password) VALUES ("${name}", "${country}","${city}","${hash}")`
    );

    res.send({ message: "Gallery uploaded successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// LOGIN as a gallery
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const results = await db(`SELECT * FROM gallery WHERE name = "${name}"`);
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

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
  db(`SELECT * FROM gallery WHERE id="${id}";`)
    .then((result) => {
      res.send(result.data);
    })
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
