const express = require('express')
const apiRouter = express.Router()
const sessionRouter = require('./routes/Session')
const comercRouter = require('./routes/ComercRoutes')
const userRouter = require('./routes/users')
//const adminController = require('./controllers/AdminController')
const adminRouter = require('./routes/AdminRoutes')
const produtoRouter = require('./routes/ProdutoRoutes')
const reclamacaoRouter = require('./routes/ReclamacaoRoutes')
const encomendaRouter = require('./routes/EncomendaRoutes')

apiRouter.get('/', (req, res) => {
  res.send({
      status: 'ok'
  })
})

apiRouter.use(sessionRouter)
apiRouter.use("/comerc", comercRouter)
apiRouter.use(userRouter)
apiRouter.use("/admin", adminRouter)
apiRouter.use("/produto", produtoRouter)
apiRouter.use("/reclamacao", reclamacaoRouter)
apiRouter.use("/Encomendas", encomendaRouter)

module.exports = apiRouter