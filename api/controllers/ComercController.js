var mongoose = require("mongoose");
const User = require('../models/utilizador')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

var ComercController = {};

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

//Criar um utilizador -> Comerciante (admin)
ComercController.createUserComerc = async (req, res) => {
    try {
        if (req.body.role == null) {

            const encryptedPass = bcrypt.hashSync(req.body.password, 10);
            const newData =
            {
                ...req.body,
                password: encryptedPass,
                role: "COMERCIANTE"
            }
            const result = await User.create(newData);

            var mailOptions = {
                to: req.body.email,
                subject: 'Conta de Comerciante',
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

//Apagar comerciante (admin)
ComercController.deleteUserComerc = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id })
        if (user.role === "COMERCIANTE") {
            await user.remove()
            res.json(user)
        } else {
            console.log("Utilizador não é um COMERCIANTE")
            res.send()
        }
    } catch (err) {
        console.log(err)
    }
}

//Atualizar Comerciante (admin)
ComercController.updateUserComerc = async (req, res) => {
    try {
        const userData = req.body
        if (userData.role !== 'COMERCIANTE') {
            userData.role = 'COMERCIANTE'
        }

        //if new password is sent, encrypt
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        await User.findOneAndUpdate({ id: req.params.id, role: "COMERCIANTE" }, userData)
        const result = await User.findOne({ id: req.params.id })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//Listar Comerciantes (admin)
ComercController.listUserComerc = async (req, res) => {
    try {
        const list = await User.find({ role: "COMERCIANTE" })
        res.json(list);
    } catch (err) {
        console.log(err)
    }
}

//encontrar um utilizador do tipo Comerciante por ID (admin) 
ComercController.findOneUserComerc = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id, role: "COMERCIANTE" })
        if (user != null) {
            res.json({ ...user.toJSON(), password: undefined })
        } else {
            res.send("Não existe nenhum Comerciante com esse Id!")
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = ComercController