const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

const createToken = (password) => {
    const secretKey = JWT_SECRET;
    return jwt.sign({ password: password }, secretKey);
};


module.exports = createToken;