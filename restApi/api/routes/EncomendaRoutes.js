var express = require('express');
var router = express.Router();
var Encomenda = require("../controllers/EncomendaController")
const authorize = require("../middleware/authorize")


//Criar Produto -> Testado no Postman
router.post('/create/:id', function (req, res) {
    Encomenda.createEncomenda(req, res)
})

//list all encomendas -> Testado no Postman
router.get('/ListaEncomendas/:id', function (req, res) {
    Encomenda.listEncomendas(req, res)
})

//Verificar estado da encomenda -> Testado no Postman
router.get('/consultar/:id', function (req, res) {
    Encomenda.getEstado(req, res)
})

module.exports = router;