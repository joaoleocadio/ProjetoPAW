var express = require('express');
var router = express.Router();
var User = require("../controllers/UserController")
const authorize = require('../middleware/authorize')


//List user Cliente -> Testado no Postman
router.get('/userList', function(req, res, next) {
  User.listUser(req, res)
});

//Create user -> Testado no Postman
router.post('/create', function (req, res) {
  User.createUser(req, res)
})

//Delete user -> Testado no Postman (não é pedido)
router.delete('/:id', function (req, res) {
  User.deleteUser(req, res)
})

//Update user -> Testado no Postman
router.put('/:id', function (req, res) {
  User.updateUser(req, res)
})




module.exports = router;
