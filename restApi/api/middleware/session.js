const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || ''
const parseToken = (req) => {
	if (req.cookies.session && req.cookies.session.length) {
		return req.cookies.session
	} else {
		//in case the token is sent in the header
		const authorization = req.header('Authorization')
		if (authorization && authorization.startsWith('Bearer ')) {
			return authorization.substring(7)
		}
	}
	//return null
}

const sessionMiddleware = (req, res, next) => {
	const sessionStr = parseToken(req)
	try {
		if (sessionStr) {
			const user = jwt.verify(sessionStr, secret)
			req.sessionUser = user
		} else {
			req.sessionUser = null
		}
	} catch (e) {
		console.error(e.message)
		req.sessionUser = null
	}
	next()
}

module.exports = sessionMiddleware
