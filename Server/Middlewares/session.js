const { parseError } = require('../Util/errorParser');
const { parseToken } = require('../Util/tokenManager');

module.exports = () => async (req, res, next) => {
    const token = req.cookies['AUTHORIZATION'];
    if (token) {
        try {
            const payload = await parseToken(token);
            req.user = payload;
            req.token = token;
        } catch (error) {
            const message = parseError(error);
            res.cookie('AUTHORIZATION', 'alabala', { maxAge: 0, sameSite: "lax" });
            return res.status(401).json({ message });
        }
    }

    next();
};