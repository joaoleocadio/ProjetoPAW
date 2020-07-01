var express = require('express');
var router = express.Router();
var User = require("../controllers/UserController")
const authorize = require('../middleware/authorize')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Create user
router.post('/create', authorize(['CLIENTE']), function (req, res) {
  User.createUser(req, res)
})

router.delete('/:id', authorize(['CLIENTE']), function (req, res) {
  User.deleteUser(req, res)
})

router.put('/:id', authorize(['CLIENTE']), function (req, res) {
  User.updateUser(req, res)
})




module.exports = router;
