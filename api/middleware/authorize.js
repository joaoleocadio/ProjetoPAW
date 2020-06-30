const authorize = (roles) => {
    roles = roles || []
    return (req, res, next) => {
        if (!req.sessionUser) {
            next({
                message: 'Not Authenticated',
                status: 401
            })
        } else {
            const hasAuthorization = roles.includes(req.sessionUser.role)
    
            if (hasAuthorization) {
                next()
            } else {
                next({
                    message: 'Not Authorized',
                    status: 401
                })
            }
        }
    }
}

module.exports = authorize

