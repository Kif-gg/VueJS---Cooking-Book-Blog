const { Schema, model } = require("mongoose");

// Regex complexity is not high due to nature of the project!

const adminSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already registered!"],
        match: [/^[a-z0-9._-]{3,20}@[a-z0-9.-]{3,20}\.[a-z]{2,6}$/i, "Email is not valid!"]
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required!"]
    },
    hashedPin: {
        type: String,
        required: [true, "PIN is required!"]
    }
});

adminSchema.index({ email: 1 }, {
    collation: {
        locale: "en",
        strength: 2
    }
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;