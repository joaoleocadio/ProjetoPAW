var mongoose = require("mongoose");
const User = require('../models/produto')
const Produto = require('../models/produto');
const authorize = require('../middleware/authorize')

var ProdutoController = {};

ProdutoController.createProduto = async (req, res) => {
    try {

        const newData = {
            ...req.body,
        }

        const produto = await Produto.create(newData)
        await User.findOneAndUpdate({_id: req.params.id, role: "COMERCIANTE"}, { $push: { produto: Produto._id}})

        const info = await Produto.findOne({ _id: produto._id }).populate('utilizador', ['username', 'id', 'email'])

        res.json(result);
    } catch (error) {
        console.log(error)
    }
}

ProdutoController.updateProduto = async (req, res) => {
    try {
        const userData = req.body
        await Produto.findOneAndUpdate({ id: req.params.id}, userData)
        const result = await Produto.findOne({ id: req.params.id })
            //populate('covtest')
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

ProdutoController.deleteProduto = async (req, res) => {
    try {
        const produto = await Produto.findOneAndDelete({ id: req.params.id })
        res.json(produto)
    } catch (err) {
        console.log(err)
    }
}

module.exports = ProdutoController