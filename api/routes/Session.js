const express = require('express')
const sessionController = require('../controllers/sessionController')

const sessionRouter = express.Router()

sessionRouter.post('/login', sessionController.login)

sessionRouter.get('/me', sessionController.me)

sessionRouter.post('/logout', sessionController.logout)

module.exports = sessionRouter