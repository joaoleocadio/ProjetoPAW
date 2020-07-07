var mongoose = require("mongoose");
const User = require('../models/produto')
const Produto = require('../models/produto');
const authorize = require('../middleware/authorize');
const produto = require("../models/produto");

var ProdutoController = {};

ProdutoController.createProduto = async (req, res) => {
    try {

        const newData = {
            ...req.body,
            vendedor: req.params.id
        }

        const produto = await Produto.create(newData)
        const result = await Produto.findOne({_id: produto._id}).populate('vendedor')
        res.json(result);

    } catch (error) {
        console.log(error)
    }
}

ProdutoController.updateProduto = async (req, res) => {
    try {
        const userData = req.body
        await Produto.findOneAndUpdate({ _id: req.params.id}, userData)
        const result = await Produto.findOne({ _id: req.params.id }).populate('vendedor')
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

ProdutoController.listProduto = async (req, res) => {
    try {
        const lista = await Produto.find().populate('vendedor')
        res.json(lista);
    } catch (error) {
        console.log(error)
    }
}

ProdutoController.listComercProduto  = async(req, res) =>{
    try{
        const lista = await Produto.find({vendedor: req.params.id})
        res.json(lista)
    } catch (error) {
        console.log(error)
    }

}

module.exports = ProdutoController