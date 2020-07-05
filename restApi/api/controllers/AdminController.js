var mongoose = require("mongoose");
const User = require('../models/utilizador')
const bcrypt = require('bcrypt');

var adminController = {};

//Update Admin password (admin)
adminController.updatePassword = async (req, res) => {
    try {
        if (req.body.password == "undefined") {
            res.json('empty password')
        } else {
            console.log(req.body.password)
            const encryptedPass = bcrypt.hashSync(req.body.password, 10);

            const newData =
            {
                password: encryptedPass
            }

            await User.findOneAndUpdate({ id: req.params.id, role: "ADMIN" }, newData);
            const result = await User.find({ id: req.params.id, role: "ADMIN" })
            res.json(result)

        }
    } catch (err) {
        console.log(err)
    }
}

//find the admin (admin)
adminController.getAdmin = async (req, res) => {
    try {
        const result = await User.findOne({ role: "ADMIN" })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

module.exports = adminController