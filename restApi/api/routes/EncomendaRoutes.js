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

//list all encomendas to Comerciantes -> NAO Testado no Postman
router.get('/ListaEncomendasComerciantes/:id', authorize(['ADMIN', 'COMERCIANTE']),function (req, res) {
    Encomenda.listEncomendasToComerciantes(req, res)
})

//Verificar estado da encomenda -> Testado no Postman
router.get('/consultar/:id', authorize(['ADMIN', 'COMERCIANTE', 'CLIENTE']), function (req, res) {
    Encomenda.getEstado(req, res)
})

//Atualizar estado da encomenda -> NAO Testado no Postman
router.put('/atualizarEncomenda/:id', authorize(['ADMIN', 'COMERCIANTE']), function (req, res) {
    Encomenda.updateEstado(req, res);
})

module.exports = router;