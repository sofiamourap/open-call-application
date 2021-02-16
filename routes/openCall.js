var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// GET all open Calls
router.get('/', function(req, res) {
    db("SELECT * FROM openCall;")
      .then(result => {
        res.send(result.data);
      })
      .catch(err => res.status(500).send(err));
  });
  
  //GET open Call by id
  router.get('/:id', function(req, res) {
    const { id } = req.params;
    db(`SELECT * FROM openCall WHERE id="${id}";`)
    .then(result => {
      res.send(result.data)
    })
    .catch(err => res.status(500).send(err));
  })
  
  //POST open Call
  router.post('/', function(req, res){
    const {residency_name, gallery_id, description} = req.body;
    db(`INSERT INTO openCall (residency_name, gallery_id, description, status) VALUES ("${residency_name}", "${gallery_id}", "${description}", "1");`)
    .then(res.send({message: "Open Call uploaded successfully"}))
    .catch(err => res.status(500).send(err));
  })
  
  //EDIT open Call  how can I allow changes to be made but if they are not specify it doesnt matter?
  router.put('/:id', function(req,res){
    const { id } = req.params;
    const { gallery_id, status } = req.body;
    db(`UPDATE openCall SET gallery_id="${gallery_id}", status="${status}" WHERE id="${id}";`)
    .then(res.send(
      {message: "status updated"}
      ))
    .catch(err => res.status(500).send(err));
  });

  //DELETE open Call
  router.delete('/:id', function(req, res){
    const { id } = req.params;
    db(`DELETE FROM openCall WHERE id="${id}";`)
    .then(res.send({ message: "project deleted"}))
    .catch(err => res.status(500).send(err))
  });

module.exports = router;