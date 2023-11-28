const User = require("../Models/User");
const BlacklistedToken = require("../Models/BlacklistedToken");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { parseError } = require("../Util/errorParser");
const { validateUsername, validateEmail } = require("../Util/inputValidator");

const secret = "i1X1BCKFoVGv7QoQeUqz2AvQV2qJeqqC";

async function register(username, email, password, repass) {
    try {
        let errorStack = "";
        const existingUsername = await User.findOne({ username }).collation({ locale: "en", strength: 2 });
        const existingEmail = await User.findOne({ email }).collation({ locale: "en", strength: 2 });

        if (existingUsername) {
            errorStack += "Username already exists!\r\n";
        }
        if (existingEmail) {
            errorStack += "Email already registered!\r\n";
        }
        if (username.length == 0) {
            errorStack += "Username is required!\r\n";
        } else if (username.length < 3) {
            errorStack += "Username length must be at least 3 characters!\r\n"
        } else if (username.length > 20) {
            errorStack += "Username length must not exceed 20 characters!\r\n"
        } else if (!validateUsername(username)) {
            errorStack += "Username is not valid!\r\nAllowed characters: A to Z, a to z, 0 to 9, _ (except start/end) and . (except start/end)\r\n";
        }
        if (email.length == 0) {
            errorStack += "Email is required!\r\n";
        } else if (!validateEmail(email)) {
            errorStack += "Email is not valid!\r\n"
        }
        if (password.includes(" ")) {
            errorStack += "Password must not contain whitespaces!\r\n";
        }
        if (password.length == 0) {
            errorStack += "Password is required!\r\n";
        } else if (password.length < 6) {
            errorStack += "Password length must be at least 6 characters!\r\n";
        } else if (password.length > 256) {
            errorStack += "Password length must not exceed 256 characters!\r\n"
        } else if (repass != password) {
            errorStack += "Repeated password does not match the original!\r\n"
        }

        if (errorStack.length > 0) {
            throw new Error(errorStack);
        } else {
            const user = User.create({
                username,
                email,
                hashedPassword: await bcrypt.hash(password, 15)
            });
            return createToken(user);
        }
    } catch (error) {
        throw error;
    }
}

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