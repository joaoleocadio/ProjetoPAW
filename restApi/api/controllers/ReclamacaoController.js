var mongoose = require("mongoose");
const Reclamacao = require("../models/reclamacao")
const Encomenda = require("../models/encomenda")
const authorize = require('../middleware/authorize');
const Produto = require('../models/produto');

var ReclamacaoController = {};

ReclamacaoController.createReclamacao = async (req, res) => {
    try {

        const newData = {
            ...req.body,
        }

        const reclamacao = await Reclamacao.create(newData)
        await Reclamacao.findOneAndUpdate({ _id: req.params.id, role: "COMERCIANTE" }, { $push: { reclamacao: Reclamacao._id } })
        const encomenda = await Encomenda.findOneAndUpdate({ _id: req.params.id }, { reclamacao: reclamacao._id })
        const info = await Reclamacao.findOne({ _id: reclamacao._id }).populate('utilizador', ['username', 'id', 'email'])
        res.json(info);
    } catch (error) {
        console.log(error)
    }
}

ReclamacaoController.updateReclamacao = async (req, res) => {
    try {
        const userData = req.body
        await Reclamacao.findOneAndUpdate({ _id: req.params.id }, userData)
        const result = await Reclamacao.findOne({ _id: req.params.id })

        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

ReclamacaoController.getEstado = async (req, res) => {
    try {
        const result = await Reclamacao.findOne({ id: req.params.id })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

ReclamacaoController.listAllReclamacao = async (req, res) => {
    try {
        const encomendas = await Encomenda.find({ user: req.params.id })
        listaReclamacao = [];

        for (let i = 0; i < encomendas.length; i++) {
            if (encomendas[i].reclamacao != null) {
                info = await Reclamacao.findOne({ _id: encomendas[i].reclamacao });
                listaReclamacao.push(info);
            }
        }
        res.json(listaReclamacao)
    } catch (err) {
        console.log(err)
    }
}

ReclamacaoController.listReclamacoesToComerciantes = async (req, res) => {
    try {
        lista = [];
        const encomendas = await Encomenda.find({});
        for (let i = 0; i < encomendas.length; i++) {
            const produto = await Produto.find({ _id: encomendas[i].produtos[0].produto }).populate('vendedor');
            if(produto[0].vendedor._id == req.params.id){
                if(encomendas[i].reclamacao != null){
                    result = await Reclamacao.findOne({ _id: encomendas[i].reclamacao });
                    lista.push(result);
                }
            }
        }
        res.json(lista);
    } catch (err) {
        console.log(err)
    }
}

module.exports = ReclamacaoController