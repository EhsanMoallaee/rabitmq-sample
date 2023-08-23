const jwt = require('jsonwebtoken');

async function signToken(payload) {
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

module.exports = {
    signToken
}