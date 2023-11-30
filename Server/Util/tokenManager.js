const jwt = require("jsonwebtoken");

const BlacklistedToken = require("../Models/BlacklistedToken");
const { parseError } = require("../Util/errorParser");

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
    try {
        const match = await BlacklistedToken.find({ token: token });

        if (match.length > 0) {
            throw new Error('Token is in blacklist!')
        } else {
            return jwt.verify(token, secret);
        }
    } catch (error) {
        const parsed = parseError(error);
        throw new Error(parsed);
    };
};

module.exports = {
    createToken,
    parseToken
};