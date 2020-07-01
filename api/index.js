const express = require('express')
const apiRouter = express.Router()
const sessionRouter = require('./routes/Session')
const comercRouter = require('./routes/ComercRoutes')

apiRouter.get('/', (req, res) => {
  res.send({
      status: 'ok'
  })
})

apiRouter.use(sessionRouter)
apiRouter.use("/comerc", comercRouter)

module.exports = apiRouter