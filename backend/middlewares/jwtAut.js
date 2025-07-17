const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

const createToken = (userid) => {
    const secretKey = JWT_SECRET;
    return jwt.sign({ userid: userid }, secretKey);
};


module.exports = createToken;