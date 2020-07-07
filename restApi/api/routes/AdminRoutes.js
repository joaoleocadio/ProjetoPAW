var express = require('express');
var router = express.Router();
var Admin = require("../controllers/AdminController");
const authorize = require('../middleware/authorize')

//get Admin -> Testado no Postman
router.get('/', authorize(['ADMIN']), function (req, res) {
    Admin.getAdmin(req, res)
})

//Update Admin password -> Testado no Postman
router.put('/changePass/:id', authorize(['ADMIN']), function (req, res) {
    Admin.updatePassword(req, res)
})


module.exports = router;