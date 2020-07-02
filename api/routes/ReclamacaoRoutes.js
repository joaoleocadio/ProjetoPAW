var express = require('express');
var router = express.Router();
var Reclamacao = require("../controllers/ReclamacaoController")
const authorize = require("../middleware/authorize")

//Criar Reclamação -> Testado no Postman
router.post('/create', function (req, res) {
    Reclamacao.createReclamacao(req, res)
})

//Editar Reclamação -> Testado no Postman
router.put('/:id', function (req, res) {
    Reclamacao.updateReclamacao(req, res)
})

//Consultar reclamação por id -> Testado no Postman
router.get('/consultar/:id', function (req, res) {
    Reclamacao.getEstado(req, res)
})

module.exports = router;