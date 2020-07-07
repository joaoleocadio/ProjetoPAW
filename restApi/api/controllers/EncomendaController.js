var mongoose = require("mongoose");
const User = require("../models/utilizador")
const Encomenda = require("../models/encomenda")
const authorize = require('../middleware/authorize')
const nodemailer = require("nodemailer");

var EncomendaController = {};

var uniqid = require('uniqid');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'shoponlinepaw@gmail.com',
        pass: 'trabalhopaw123'
    }, tls: {
        rejectUnauthorized: false
    }
});

EncomendaController.createEncomenda = async (req, res) => {
    try {

        const targetUser = req.params.id
        const randomId = uniqid.process('')
        const newData = 
        {
            ...req.body,
            id: randomId,
            user: targetUser
        }

        //criar encomenda
        const encomenda = await Encomenda.create(newData)

        await User.findOneAndUpdate({ _id: req.params.id, role: "CLIENTE" }, { $push: { encomenda: encomenda._id } })

        //const result = await Encomenda.findOne({ _id: encomenda._id }).populate('user', ['username', 'id', 'email'])
        const result = await Encomenda.findOne({ _id: encomenda._id }).populate('produtos.produto').populate('user', ['username', 'id', 'email'])

        //console.log(result.produtos[0].produto.nome)
        let mailOptions = {
            to: result.user.email,
            subject: 'Encomenda',
            text: `A sua encomenda encontra-se a ser processada neste momento com o seguinte código - ${ encomenda.id }`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json(result);
    } catch (error) {
        console.log(error)
    }
}

EncomendaController.listEncomendas = async (req, res) => {
    try {
        const lista = await Encomenda.find({user: req.params.id}).populate('produtos.produto').populate('user', ['username', 'id', 'email'])
        res.json(lista);
    } catch (err) {
        console.log(err)
    }
}

EncomendaController.getEstado = async (req, res) => {
    try {
        const result = await Encomenda.findOne({ id: req.params.id })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

module.exports = EncomendaController