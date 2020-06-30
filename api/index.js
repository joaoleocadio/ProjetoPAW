const express = require('express')
const apiRouter = express.Router()
const sessionRouter = require('./routes/Session')

apiRouter.get('/', (req, res) => {
  res.send({
      status: 'ok'
  })
})

apiRouter.use(sessionRouter)

module.exports = apiRouter