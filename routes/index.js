var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// GET all projects posted by the candidats
router.get('/projects', function(req, res, next) {
  db("SELECT * FROM candidats;")
    .then(result => {
      res.send(result.data);
    })
    .catch(err => res.status(500).send(err));
});

//GET projects by id
router.get('/projects/:id', function(req, res){
  const { id } = req.params;
  db(`SELECT * FROM candidats WHERE id=${id}`)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => res.status(500).send(err));
});

//POST project

router.post('/projects', function(req, res){
  const {fullName, project, email, residencyName} = req.body;
  db(`INSERT INTO candidats (fullName, project, email, residencyName) VALUES ("${fullName}", "${project}", "${email}", "${residencyName}");`)
  .then(res.send(
    {message: "Project uploaded"}
    ))
  .catch(err => res.status(500).send(err));
});

//EDIT status of the uploaded project. false = not selected, true = selected
router.put('/projects/:id', function(req,res){
  const { id } = req.params;
  const { status } = req.body;
  db(`UPDATE candidats SET status="${status}" WHERE id="${id}";`)
  .then(res.send(
    {message: "status updated"}
    ))
  .catch(err => res.status(500).send(err));
})


// GET all open Calls
router.get('/gallery', function(req, res, next) {
  db("SELECT * FROM openCall;")
    .then(result => {
      res.send(result.data);
    })
    .catch(err => res.status(500).send(err));
});


module.exports = router;
