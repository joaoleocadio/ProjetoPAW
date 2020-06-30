var mongoose = require("mongoose");
const User = require('../models/utilizador')
const bcrypt = require('bcrypt')
const { parse } = require('url')
const { parse: parseQuery } = require('querystring')

var UserController = {};





module.exports = UserController