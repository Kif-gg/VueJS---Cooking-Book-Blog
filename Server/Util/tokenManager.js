const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../Models/BlacklistedToken");

const secret = "i1X1BCKFoVGv7QoQeUqz2AvQV2qJeqqC";

function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
    };
};

async function parseToken(token) {
    const match = await BlacklistedToken.find({ token: token });

    if (match.length > 0) {
        throw new Error('Token is in blacklist!');
    }
    return jwt.verify(token, secret);
};

module.exports = {
    createToken,
    parseToken
};