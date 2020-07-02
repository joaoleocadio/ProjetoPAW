require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const apiRouter = require('./api')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./api/models/utilizador')
const Produto = require('./api/models/produto')
const bcrypt = require('bcrypt');
const sessionMiddleware = require('./api/middleware/session')


const app = express();

const MONGO_DB_HOST = process.env.MONGO_DB_HOST
const MONGO_DB_PORT = process.env.MONGO_DB_PORT
const MONGO_DB_DATABASE_NAME = process.env.MONGO_DB_DATABASE_NAME

mongoose
    .connect(
        `mongodb://${ MONGO_DB_HOST }:${ MONGO_DB_PORT }/${ MONGO_DB_DATABASE_NAME }`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }
    )
    .then(async (mongoose) => {
        console.log('connected to mongo')
        const adminUser = await User.findOne({ role: 'ADMIN' }).select('+password')
        if (!adminUser) {
            console.log('creating admin user')
            const encryptedPass = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
            const adminUser = await new User({
                id: process.env.ADMIN_ID,
                username: process.env.ADMIN_USERNAME,
                password: encryptedPass,
                firstName: process.env.ADMIN_FIRSTNAME,
                lastName: process.env.ADMIN_LASTNAME,
                email: process.env.ADMIN_EMAIL,
                role: 'ADMIN'
            })
                .save()
                .catch(console.error)

            if (adminUser) {
                console.log('Admin created')
                console.table([adminUser.toJSON()])
            }
        } else {
            console.log('Admin:')
            console.table([adminUser.toJSON()])
        }
    })
    .catch(console.error)


// Setup application to support body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Setup cookie parser
app.use(cookieParser())
app.use(sessionMiddleware)

app.use('/api', cors(), apiRouter)

// Start the server
app.listen(process.env.PORT || 5000, () =>
    console.log(`Example app listening at http://localhost:3000/api/`)
)

