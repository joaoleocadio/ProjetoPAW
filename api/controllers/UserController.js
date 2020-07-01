var mongoose = require("mongoose");
const User = require('../models/utilizador')
const bcrypt = require('bcrypt')
const { parse } = require('url')
const { parse: parseQuery } = require('querystring')
const nodemailer = require("nodemailer");

var UserController = {};

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

UserController.createUser = async (req, res) => {
    try {
        if (req.body.role == null) {

            const encryptedPass = bcrypt.hashSync(req.body.password, 10);
            const newData =
            {
                ...req.body,
                password: encryptedPass,
                role: "CLIENTE"
            }
            const result = await User.create(newData);

            var mailOptions = {
                to: req.body.email,
                subject: 'Conta Cliente',
                text: `Credenciais de sessão:
                        email: ${req.body.email}
                        password: ${ req.body.password}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.json(result);
        } else {
            console.log("User is technical by default"); //Alterar
            res.send()
        }


    } catch (err) {
        res.status(400)
        res.json(err)
        console.log(err)
    }
}

UserController.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id })
        if (user.role === "CLIENTE") {
            await user.remove()
            res.json(user)
        } else {
            console.log("Utilizador não é um Cliente")
            res.send()
        }
    } catch (err) {
        console.log(err)
    }
}

UserController.listUser = async (req, res) => {
    try {
        const list = await User.find({ role: "CLIENTE" })
            //populate('id', 'nome')
        res.json(list);
    } catch (err) {
        console.log(err)
    }
}

UserController.updateUser = async (req, res) => {
    try {
        const userData = req.body
        if (userData.role !== 'CLIENTE') {
            userData.role = 'CLIENTE'
        }

        //if new password is sent, encrypt
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        await User.findOneAndUpdate({ id: req.params.id, role: "CLIENTE" }, userData)
        const result = await User.findOne({ id: req.params.id })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

module.exports = UserController