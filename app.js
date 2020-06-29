const express = require('express')
const cookieParser = require('cookie-parser')
const apiRouter = require('./api')
const cors = require('cors')


const app = express()


// Setup application to support body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Setup cookie parser
app.use(cookieParser())

app.use('/api', cors(), apiRouter)

// Start the server
app.listen(3000, () =>
    console.log(`Example app listening at http://localhost:3000/api/`)
)

