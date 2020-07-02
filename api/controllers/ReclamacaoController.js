var mongoose = require("mongoose");
const Reclamacao = require("../models/reclamacao")
const authorize = require('../middleware/authorize')

var ReclamacaoController = {};

ReclamacaoController.createReclamacao = async (req, res) => {
    try {

        const newData = {
            ...req.body,
        }

        const reclamacao = await Reclamacao.create(newData)
        await Reclamacao.findOneAndUpdate({_id: req.params.id, role: "COMERCIANTE"}, { $push: { reclamacao: Reclamacao._id}})

        const info = await Reclamacao.findOne({ _id: reclamacao._id }).populate('utilizador', ['username', 'id', 'email'])

        res.json(info);
    } catch (error) {
        console.log(error)
    }
}

ReclamacaoController.updateReclamacao = async (req, res) => {
    try {
        const userData = req.body
        await Reclamacao.findOneAndUpdate({ id: req.params.id}, userData)
        const result = await Reclamacao.findOne({ id: req.params.id })
            //populate('covtest')
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

module.exports = ReclamacaoController