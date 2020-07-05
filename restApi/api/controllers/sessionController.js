const jwt = require('jsonwebtoken')
const User = require('../models/utilizador')
const bcrypt = require('bcrypt');

const login = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (user) {

        const formatedUser = user.toJSON()

        const isValidBcrypt = bcrypt.compareSync(password, user.password)

        if (isValidBcrypt) {
            try {
                const expiration = process.env.SESSION_EXP
                const secret = process.env.JWT_SECRET

                const jwtToken = jwt.sign(formatedUser, secret, { expiresIn: expiration / 1000 })

                res.cookie(
                    'session',
                    jwtToken,
                    {
                        expires: new Date(Date.now() + expiration),
                        httpOnly: true
                    }
                )

                res.json({
                    user: {
                        ...formatedUser,
                        password: undefined
                    },
                    token: jwtToken
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            res.status(401)
            res.json(null)
        }

    } else {
        res.status(401) // 401 Unauthorized also means unauthenticated
        res.json(null)
    }
}

const me = (req, res) => {
    if (req.sessionUser) {
        res.json(req.sessionUser)
    } else {
        res.status(401)
        res.json(null)
    }
}

const logout = (req, res) => {
    res.clearCookie('session')
    res.json({ success: 'true' })
}

module.exports = {
    login,
    logout,
    me
}
