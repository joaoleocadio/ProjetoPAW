var express = require('express');
var router = express.Router();
var User = require("../controllers/UserController")
const authorize = require('../middleware/authorize')


//List user Cliente -> Testado no Postman
router.get('/userList', authorize(['ADMIN', 'COMERCIANTE']), function(req, res, next) {
  User.listUser(req, res)
});

//Create user -> Testado no Postman
router.post('/create', authorize(['ADMIN', 'COMERCIANTE']), function (req, res) {
  User.createUser(req, res)
})

//Delete user -> Testado no Postman (não é pedido)
router.delete('/:id', authorize(['ADMIN', 'COMERCIANTE']), function (req, res) {
  User.deleteUser(req, res)
})

//Update user -> Testado no Postman
router.put('/:id', authorize(['ADMIN', 'COMERCIANTE']), function (req, res) {
  User.updateUser(req, res)
})

router.get('/allUsers', authorize(['ADMIN']), function(req, res){
  User.listAllUsers(req, res)
})

module.exports = router;
