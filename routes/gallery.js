var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// // GET all open Calls
// router.get('/', function(req, res) {
//   db("SELECT * FROM openCall;")
//     .then(result => {
//       res.send(result.data);
//     })
//     .catch(err => res.status(500).send(err));
// });

// //GET open Call by id
// router.get('/:id', function(req, res) {
//   const { id } = req.params;
//   db(`SELECT * FROM openCall WHERE id="${id}";`)
//   .then(result => {
//     res.send(result.data)
//   })
//   .catch(err => res.status(500).send(err));
// })

// //POST open Call
// router.post('/', function(req, res){
//   const {residencyName, gallery, description} = req.body;
//   db(`INSERT INTO openCall (residencyName, gallery, description, status) VALUES ("${residencyName}", "${gallery}", "${description}", "1");`)
//   .then(res.send({message: "Open Call uploaded successfully"}))
//   .catch(err => res.status(500).send(err));
// })

// //EDIT oen Call
// router.put('/:id', function(req, res){
//   db(``)
// })


module.exports = router;
