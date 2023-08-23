const bcrypt = require('bcrypt');

async function comparePassword(userPassword, password) {
    const result = await bcrypt.compare(password, userPassword);
    return result;
}

module.exports = {
    comparePassword,
}