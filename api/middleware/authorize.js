const authorize = (roles) => {
    roles = roles || []
    return (req, res, next) => {
        if (!req.sessionUser) {
            res.status(401)
            next('Not Authenticated')
        } else {
            const hasAuthorization = roles.includes(req.sessionUser.role)

            if (hasAuthorization) {
                next()
            } else {
                res.status(401)
                next('Not Authorized')
            }
        }
    }
}

module.exports = authorize
