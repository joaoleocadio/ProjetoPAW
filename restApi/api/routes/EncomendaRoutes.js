var express = require('express');
var router = express.Router();
var Encomenda = require("../controllers/EncomendaController")
const authorize = require("../middleware/authorize")


//Criar Produto -> Testado no Postman
router.post('/create/:id',authorize(['CLIENTE']), function (req, res) {
    Encomenda.createEncomenda(req, res)
})

//list all encomendas -> Testado no Postman
router.get('/ListaEncomendas/:id', authorize(['ADMIN', 'COMERCIANTE', 'CLIENTE']),function (req, res) {
    Encomenda.listEncomendas(req, res)
})

//Verificar estado da encomenda -> Testado no Postman
router.get('/consultar/:id', authorize(['ADMIN', 'COMERCIANTE', 'CLIENTE']), function (req, res) {
    Encomenda.getEstado(req, res)
})

module.exports = router;