var express = require('express');
var router = express.Router();
var Comerciante = require("../controllers/ComercController")
const authorize = require('../middleware/authorize')

//list all users in role Comerciante -> Testado no Postman
router.get('/ComercianteList', authorize(['ADMIN','CLIENTE','COMERCIANTE']), function (req, res) {
    Comerciante.listUserComerc(req, res)
})

//delete a specific Comerciante user -> Testado no Postman
router.delete('/:id', authorize(['ADMIN']),function (req, res) {
    Comerciante.deleteUserComerc(req, res)
})

//update specific Comerciante user -> Testado no Postman
router.put('/:id', authorize(['ADMIN','CLIENTE']), function (req, res) {
    Comerciante.updateUserComerc(req, res)
})

//get specific Comerciante user -> Testado no Postman
router.get('/:id', authorize(['ADMIN','CLIENTE']), function (req, res) {
    Comerciante.findOneUserComerc(req, res)
})

module.exports = router;