const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

const createToken = () => {
    const secretKey = JWT_SECRET;
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '7d' });
};

