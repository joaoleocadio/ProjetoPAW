var express = require('express');
var router = express.Router();
var Comerciante = require("../controllers/ComercController")
const authorize = require('../middleware/authorize')

//create Comerciante user -> Testado no Postman
router.post('/create', function (req, res) {
    Comerciante.createUserComerc(req, res)
})

//list all users in role Comerciante -> Testado no Postman
router.get('/ComercianteList', function (req, res) {
    Comerciante.listUserComerc(req, res)
})

//delete a specific Comerciante user -> Testado no Postman
router.delete('/:id', function (req, res) {
    Comerciante.deleteUserComerc(req, res)
})

//update specific Comerciante user -> Testado no Postman
router.put('/:id', function (req, res) {
    Comerciante.updateUserComerc(req, res)
})

//get specific Comerciante user -> Testado no Postman
router.get('/:id', function (req, res) {
    Comerciante.findOneUserComerc(req, res)
})

module.exports = router;