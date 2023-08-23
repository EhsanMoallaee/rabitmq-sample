const jwt = require('jsonwebtoken');

async function checkAuth(token) {
    if(!token) console.log('Errrror Not token');
    const { JWT_SECRET } = process.env;
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload) return {message: 'Authentication failed'}
    return {message: 'Authentication successfull', user: payload}
}

module.exports = {
    checkAuth
}