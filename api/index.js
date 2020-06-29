const express = require('express')
const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
  res.send({
      status: 'ok'
  })
})

module.exports = apiRouter