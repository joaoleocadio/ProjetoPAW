var express = require('express');
var router = express.Router();
var Reclamacao = require("../controllers/ReclamacaoController")
const authorize = require("../middleware/authorize")

//Criar Reclamação -> Testado no Postman
router.post('/create/:id', authorize(['CLIENTE']), function (req, res) {
    Reclamacao.createReclamacao(req, res)
})

//Editar Reclamação -> Testado no Postman
router.put('/:id', authorize(['CLIENTE', 'COMERCIANTE']), function (req, res) {
    Reclamacao.updateReclamacao(req, res)
})

//Consultar reclamação por id -> Testado no Postman
router.get('/consultar/:id', authorize(['CLIENTE', 'COMERCIANTE']), function (req, res) {
    Reclamacao.getEstado(req, res)
})

router.get('/consultarReclamacoes/:id', authorize(['CLIENTE', 'ADMIN', 'COMERCIANTE']), function (req, res) {
    Reclamacao.listAllReclamacao(req, res)
})

router.get('/consultarReclamacoesComerciante/:id', authorize(['ADMIN', 'COMERCIANTE']), function (req, res) {
    Reclamacao.listReclamacoesToComerciantes(req, res)
})

module.exports = router;