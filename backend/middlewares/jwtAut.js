const jwt = require("jsonwebtoken");

const createToken = (userid) => {
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign({ userid: userid }, secretKey);
};


module.exports = createToken;