const Admin = require("../Models/Admin");
const BlacklistedToken = require("../Models/BlacklistedToken");
const Recipe = require("../Models/Recipe");

const bcrypt = require("bcrypt");

const { createToken } = require("../Util/tokenManager");

async function login(formData) {
    try {
        const { email, password, pin } = formData;
        const admin = await Admin.findOne({ email }).collation({ locale: "en", strength: 2 });

        if (!admin) {
            throw new Error("Incorrect email, password or PIN!");
        }

        const matchPassword = bcrypt.compare(password, admin.hashedPassword);
        const matchPin = bcrypt.compare(pin, admin.hashedPin);

        if (!matchPassword || !matchPin) {
            throw new Error("Incorrect email, password or PIN!");
        }

        return createToken(admin);
    } catch (error) {
        throw error;
    }
};