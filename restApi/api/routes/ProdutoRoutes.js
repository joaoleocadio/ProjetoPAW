var express = require('express');
var router = express.Router();
var Produto = require("../controllers/ProdutoController")
const authorize = require("../middleware/authorize")

//Criar Produto
router.post('/create/:id', authorize(['ADMIN', 'COMERCIANTE']), function (req, res) {
    Produto.createProduto(req, res)
})

//Editar Produto
router.put('/:id', authorize(['ADMIN', 'COMERCIANTE']), function (req, res) {
    Produto.updateProduto(req, res)
})

//Apagar Produto
router.delete('/:id', authorize(['ADMIN', 'COMERCIANTE']), function (req, res) {
    Produto.deleteProduto(req, res)
})

//Listar Produtos de um comerciante
router.get('/ComercProducts/:id', authorize(['ADMIN', 'COMERCIANTE', 'CLIENTE']), function(req, res){
    Produto.listComercProduto(req, res)
})

//Listar todos os Produtos
router.get('/ProdutoList', authorize(['ADMIN']), function(req, res) {
    Produto.listProduto(req, res)
});

module.exports = router;