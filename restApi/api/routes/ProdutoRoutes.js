var express = require('express');
var router = express.Router();
var Produto = require("../controllers/ProdutoController")
const authorize = require("../middleware/authorize")



//Criar Produto -> Testado no Postman
router.post('/create/:id', function (req, res) {
    Produto.createProduto(req, res)
})

//Editar Produto -> Testado no Postman
router.put('/:id', function (req, res) {
    Produto.updateProduto(req, res)
})

//Apagar Produto -> Testado no Postman
router.delete('/:id', function (req, res) {
    Produto.deleteProduto(req, res)
})

router.get('/ProdutoList', function(req, res, next) {
    User.listUser(req, res)
});

module.exports = router;