var mongoose = require("mongoose");
const User = require('../models/utilizador')
const bcrypt = require('bcrypt')
const { parse } = require('url')
const { parse: parseQuery } = require('querystring')

var UserController = {};

UserController.createUser = async (req, res) => {
    try {

        if (req.body.role == null) {
            const encryptedPass = bcrypt.hashSync(req.body.password, 10);
            const newData =
            {
                ...req.body,
                role: "CLIENTE",
                password: encryptedPass
            }
            const result = await User.create(newData);

            var mailOptions = {
                to: req.body.email,
                subject: 'Conta de utilizador',
                text: `Credenciais de sessão:
                        email: ${req.body.email}
                        password: ${ req.body.password}`
            };

            res.json(result);
        } else {
            console.log("Utilizador é um cliente!");
            res.send()
        }

    } catch (err) {
        res.status(400)
        res.json(err)
        console.log(err)
    }
}


module.exports = UserController